let cryptoModule: Crypto;

export const getCryptoModule = (async () => {
    if (cryptoModule) {
        return cryptoModule;
    }

    if (typeof window !== 'undefined' && window.crypto) {
        cryptoModule = window.crypto;
    } else {
        const { webcrypto } = await import('crypto');
        cryptoModule = webcrypto as unknown as Crypto;
    }

    return cryptoModule;
})