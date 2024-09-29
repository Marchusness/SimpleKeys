# SimpleKeys
A simple node js library for cyptograhic api key generation. Encode information in api keys and validate keys without making api calls.

# Benefit of using this library
- Validate api keys without making a database call.
- Store user ids and project ids in the api keys so you can start processing the request while validating that the api key hash is in the database.

## Installation
```bash
npm install simplekeys
```

## Usage

### Generate a unique crypto key
Store this key in a environment variable or secret management service.
```ts
import { generateUniqueCryptoKeyString } from "simplekeys";

const cryptoKey = generateUniqueCryptoKeyString();
console.log(cryptoKey); // 256 character random string
```

### Generate any api key
```ts
import { 
    generateApiKey,
} from "simplekeys";

const anyString = "user_id-project_id";
const cryptoKey = process.env.CRYPTO_KEY;

const apiKey = generateApiKey(anyString, cryptoKey);
```

### Decrypt an api key
```ts
import { 
    decryptApiKey,
} from "simplekeys";

const apiKey = "user_id-project_id";
const cryptoKey = process.env.CRYPTO_KEY;

const decryptedApiKey = decryptApiKey(apiKey, cryptoKey);

if (decryptedApiKey === null) {
    // We know the api key is invalid as the decryption failed
}

// If the decryptedApiKey is valid, it will return the original string
console.log(decryptedApiKey); // "user_id-project_id"
```


### Storing an api key hash in a database
```ts
import { 
    hashApiKey,
} from "simplekeys";

const apiKey = "user_id-project_id";

const hashedApiKey = await hashApiKey(apiKey);

// Store the hashedApiKey in the database
// When validating an api key, hash the api key and compare it to the hashedApiKey in the database
```


