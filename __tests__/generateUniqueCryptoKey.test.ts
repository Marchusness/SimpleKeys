
import { generateUniqueCryptoKeyString } from '../src/generateCryptoKey';

describe('generateUniqueCryptoKey', () => {
    it('Log a cryptographically secure key', async () => {
        console.log(await generateUniqueCryptoKeyString());
    });
    it('should return a different value every single time', async () => {
        const keys = await Promise.all(Array.from({ length: 100 }, async () => {
            return await generateUniqueCryptoKeyString();
        }))

    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});