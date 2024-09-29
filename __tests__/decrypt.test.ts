import { decryptApiKey } from '../src/decrypt';
import { generateUniqueCryptoKeyString } from '../src/generateCryptoKey';

describe('decrypt Api Key', () => {
  it('should return null for an invalid API key', async () => {
    const cryptoKey = await generateUniqueCryptoKeyString();

    const invalidApiKey = 'invalid-api-key';
    
    const decrypted = await decryptApiKey(invalidApiKey, cryptoKey);
    
    expect(decrypted).toBeNull();
  });
});