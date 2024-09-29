import { getCryptoModule } from "./cryptoWrapper";

export async function hashApiKey(apiKey: string) {
  const cryptoModule = await getCryptoModule();

  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);

  const hashBuffer = await cryptoModule.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return hashHex;
}
