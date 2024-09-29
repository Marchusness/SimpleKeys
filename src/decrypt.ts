import { API_KEY_ALGORITHM, API_KEY_IV_LENGTH } from "./CONST";
import { getCryptoModule } from "./cryptoWrapper";
import { getCryptoKeyFromKey } from "./getCryptoKeyFromKey";

export async function decryptApiKey(
  apiKey: string,
  cryptoKeyString: string,
  prefix: string = "sk-"
): Promise<string | null> {
  const cryptoKey = await getCryptoKeyFromKey(cryptoKeyString);

  const cryptoModule = await getCryptoModule();

  if (!apiKey.startsWith(prefix)) {
    return null;
  }

  const decodedApiKey = Buffer.from(apiKey.slice(prefix.length), 'base64').toString('binary');
  const buffer = new Uint8Array(decodedApiKey.length);

  for (let i = 0; i < decodedApiKey.length; ++i) {
    buffer[i] = decodedApiKey.charCodeAt(i);
  }

  const iv = buffer.slice(0, API_KEY_IV_LENGTH);
  const encryptedData = buffer.slice(API_KEY_IV_LENGTH);

  let decryptedUidIvData: ArrayBuffer
  try {
    decryptedUidIvData = await cryptoModule.subtle.decrypt(
      {
        name: API_KEY_ALGORITHM,
        iv: iv,
      },
      cryptoKey,
      encryptedData,
    );
  } catch (e) {
    return null;
  }

  const decryptedIv = new Uint8Array(decryptedUidIvData.slice(-API_KEY_IV_LENGTH));
  const decryptedUid = new Uint8Array(decryptedUidIvData.slice(0, decryptedUidIvData.byteLength - API_KEY_IV_LENGTH));

  // Check if the IVs match
  if (decryptedIv.every((value, index) => value === iv[index])) {
    const decoder = new TextDecoder();

    return decoder.decode(decryptedUid);
  } else {
    return null;
  }
}
