import { decryptApiKey } from '../decrypt';
import { generateApiKey } from '../generate';
import { generateUniqueCryptoKeyString } from '../generateCryptoKey';

function generateRandomString(length: number) {
    return Math.random().toString(36).substring(2, length + 2);
}

describe('encrypt-decrypt api key', () => {
  it('Should always return the original value when encrypting then decrypting', async () => {
    const cryptoKey = await generateUniqueCryptoKeyString();

    await Promise.all(Array.from({ length: 100 }).map(async (_,index) => {
        const originalValue = generateRandomString(index*2);
        
        const apiKey = await generateApiKey(originalValue, cryptoKey);
        const decrypted = await decryptApiKey(apiKey, cryptoKey);
        
        expect(decrypted).toBe(originalValue);
    }))
  });
});