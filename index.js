require('dotenv').config();

const { Vault } = require('./lib/vault');


let VAULT_URL = process.env.VAULT_URL;
let VAULT_PATH = process.env.VAULT_PATH;
const VAULT_TOKEN = process.env.VAULT_TOKEN;

const VAULT_EXCLUDE = process.env.VAULT_EXCLUDE;
const VAULT_DEPTH = process.env.VAULT_DEPTH;

const exclude = VAULT_EXCLUDE ? VAULT_EXCLUDE.split(',') : false;

const vault = new Vault(VAULT_URL, VAULT_TOKEN, { depth: VAULT_DEPTH, exclude });

vault.fetchTree(VAULT_PATH).then(secrets => {
	if(process.env.PRETTY_PRINT === 'true'){
		console.log(JSON.stringify(secrets, null, 2));
	} else {
		console.log(JSON.stringify(secrets));
	}
	process.exit(0)
}).catch(err => {
	console.error(err);
	process.exit(1)
});
