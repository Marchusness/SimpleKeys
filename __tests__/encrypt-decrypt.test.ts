import { decryptApiKey } from '../src/decrypt';
import { generateApiKey } from '../src/generate';
import { generateUniqueCryptoKeyString } from '../src/generateCryptoKey';

function generateRandomString(length: number) {
    return Math.random().toString(36).substring(2, length + 2);
}

describe('encrypt-decrypt api key', () => {
  it('Should always return the original value when encrypting then decrypting', async () => {
    const cryptoKey = await generateUniqueCryptoKeyString();

    const API_KEY_COUNT = 1000;

    const start = performance.now();

    await Promise.all(Array.from({ length: API_KEY_COUNT }).map(async (_,index) => {
        const originalValue = generateRandomString(index*2);
        
        const apiKey = await generateApiKey(originalValue, cryptoKey);
        const decrypted = await decryptApiKey(apiKey, cryptoKey);
        
        expect(decrypted).toBe(originalValue);
    }))

    const end = performance.now();
    console.log(`Average time taken to encrypt and decrypt api key: ${(end - start)/API_KEY_COUNT} milliseconds`);
  });
});