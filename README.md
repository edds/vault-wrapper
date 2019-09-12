# vault-wrapper
If you need a way to list all secrets from your Hashicorp Vault, this is the dirtiest and least fancy.

If you need to search all your secrets for a given string, this is still a pretty ugly way.

The implementation downloads all secrets at a specific path, including children, and then optionally searches them for you.

## installation

```sh
git clone git@github.com:doramatadora/vault-wrapper.git
cd vault-wrapper
```

Then:

```js
npm install
```

## environment

You'll need your Vault token in an environment variable. Sample `.env` file:
```sh
VAULT_TOKEN=your-vault-token-here
VAULT_URL=https://your.vault.url
```


## usage

To just return everything at the defined path:
```sh
node index.js --path="/v1/secrets"
```

To search for a given string in one of your secrets. This will flatten your objects with dot notation so `{ one: { two: 'value' } }` becomes: `{ one.two: 'value' }`:
```sh
node index.js --search="my-secret-string"
```

Exclude paths can be used by setting the `VAULT_EXCLUDE` arg with a comma separated Express 4.x routes - supports wildcards:
```sh
node index.js --exclude="(.*)/shared"
```

With running commentary:
```sh
DEBUG=vault-fetch node index.js
```

With pretty printed JSON:
```sh
node index.js --pretty
```

Limit depth of search:.
```sh
VAULT_DEPTH=4 node index.js
```
