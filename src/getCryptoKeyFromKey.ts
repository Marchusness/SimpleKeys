import { API_KEY_ALGORITHM } from "./CONST";
import { getCryptoModule } from "./cryptoWrapper";

export async function getCryptoKeyFromKey(key: string): Promise<CryptoKey> {
  const cryptoModule = await getCryptoModule();

  const decodedKey = Buffer.from(key, 'base64').toString('binary');
  const keyBuffer = new Uint8Array(decodedKey.length);

  for (let i = 0; i < decodedKey.length; ++i) {
    keyBuffer[i] = decodedKey.charCodeAt(i);
  }

  return await cryptoModule.subtle.importKey(
    "raw",
    keyBuffer,
    {
      name: API_KEY_ALGORITHM,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

