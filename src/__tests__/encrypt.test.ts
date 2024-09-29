import { generateApiKey } from '../generate';
import { generateUniqueCryptoKeyString } from '../generateCryptoKey';

describe('encrypt Api Key', () => {
  it('should return a different value every single time', async () => {
    const originalValue = 'test-value';
    const cryptoKey = await generateUniqueCryptoKeyString();

    const keys = await Promise.all(Array.from({ length: 100 }, async () => {
      return await generateApiKey(originalValue, cryptoKey);
    }))

    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});