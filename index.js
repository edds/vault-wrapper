require('dotenv').config();

var argv = require('yargs')
	.options({
		search: {
			description: 'Search term to search secret values',
			default: false,
		},
		path: {
			description: 'Path to get from vault server. e.g. "/v1/secret/path',
			default: '/',
			alias: 'p',
		},
		exclude: {
			description: 'Comma separated Express 4.x routes to exclude from search, e.g. "(.*)history(.*)"',
			default: false,
		},
		pretty: {
			description: 'Pretty print JSON response',
			boolean: true,
			default: false,
		},
		depth: {
			decription: 'Depth of vault tree to search',
			default: undefined,
		},
	}).argv;

const { Vault } = require('./lib/vault');
const { filterObjectSearchingValues } = require('./lib/object-search');


const VAULT_URL = process.env.VAULT_URL;
const VAULT_TOKEN = process.env.VAULT_TOKEN;

const exclude = argv.exclude ? argv.exclude.split(',') : [];
const depth = argv.depth ? parseInt(argv.depth, 10) : false;

const vault = new Vault(VAULT_URL, VAULT_TOKEN, { depth, exclude });

vault.fetchTree(argv.path).then(secrets => {
	let output = secrets;

	if(argv.search){
		output = filterObjectSearchingValues(secrets, argv.search);
	}

	if(argv.pretty){
		console.log(JSON.stringify(output, null, 2));
	} else {
		console.log(JSON.stringify(output));
	}
	process.exit(0)
}).catch(err => {
	console.error(err);
	process.exit(1)
});
