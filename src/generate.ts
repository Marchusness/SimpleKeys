import { API_KEY_ALGORITHM, API_KEY_IV_LENGTH } from "./CONST";
import { getCryptoModule } from "./cryptoWrapper";

export async function generateApiKey(storedValue: string, cryptoKey: CryptoKey): Promise<string> {
  const cryptoModule = await getCryptoModule();

  const encoder = new TextEncoder();
  const uidData = encoder.encode(storedValue);

  const iv = cryptoModule.getRandomValues(new Uint8Array(API_KEY_IV_LENGTH));
  const ivUidData = new Uint8Array(API_KEY_IV_LENGTH + uidData.byteLength);

  ivUidData.set(new Uint8Array(uidData), 0);
  ivUidData.set(new Uint8Array(iv), uidData.byteLength);

  const encryptedData = await cryptoModule.subtle.encrypt(
    {
      name: API_KEY_ALGORITHM,
      iv: iv,
    },
    cryptoKey,
    ivUidData,
  );

  const combinedData = new Uint8Array(API_KEY_IV_LENGTH + encryptedData.byteLength);
  combinedData.set(new Uint8Array(iv), 0);
  combinedData.set(new Uint8Array(encryptedData), API_KEY_IV_LENGTH);

  const apiKey = Buffer.from(combinedData).toString('base64');
  return apiKey;
}
