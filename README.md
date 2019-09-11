# vault-wrapper
If you need a way to list all secrets from your Hashicorp Vault, this is the dirtiest and least fancy.

The implementation downloads all secrets at a specific path, including children.

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
VAULT_PATH=/path/to/your/vault/root
```


## usage

To just return everything at the defined path:
```sh
node index.js
```

Exclude paths can be used by setting the `VAULT_EXCLUDE` arg with a comma separated Express 4.x routes - supports wildcards:
```sh
VAULT_EXCLUDE="vault-exclude:(.*)/shared,(.*)/continuous-integration" node index.js
```

With running commentary:
```sh
DEBUG=vault-fetch node index.js
```

With pretty printed JSON:
```sh
PRETTY_PRINT=true node index.js
```

Limit depth of search:.
```sh
VAULT_DEPTH=4 node index.js
```
