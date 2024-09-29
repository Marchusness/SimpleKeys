import { API_KEY_ALGORITHM } from "./CONST";
import { getCryptoModule } from "./cryptoWrapper";


export function isCryptoKey(key: CryptoKey | CryptoKeyPair): key is CryptoKey {
    return key instanceof CryptoKey;
  }
  
  export async function generateUniqueCryptoKeyString(): Promise<string> {
    const cryptoModule = await getCryptoModule();
  
    const cryptoKey = await cryptoModule.subtle.generateKey({
      name: API_KEY_ALGORITHM,
      length: 256,
    }, true, ["encrypt", "decrypt"]);
  
    if (!isCryptoKey(cryptoKey)) {
      throw new Error("Generated a crypto key pair instead of a crypto key");
    }
  
    const exportedKey = await cryptoModule.subtle.exportKey("raw", cryptoKey);
    const base64Key = Buffer.from(exportedKey).toString("base64");
  
    return base64Key;
  }