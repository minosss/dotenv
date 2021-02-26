'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

function loadEnvFiles(options) {
	const files = Array.isArray(options.filePath)
		? options.filePath
		: [options.filePath || path.resolve(process.cwd(), '.env')];

	let config = {};
	for (const file of files) {
		if (fs.existsSync(file)) {
			console.log(file);
			config = Object.assign(config, dotenv.parse(fs.readFileSync(file)));
		}
	}

	config = dotenvExpand({parsed: config}).parsed || config;

	return config;
}

function config(options = {}) {
	const opts = Object.assign(
		{
			ignoreVars: false,
		},
		options
	);

	if (!opts.filePath) {
		opts.filePath = [
			'.env',
			'.env.local',
			`.env.${process.env.NODE_ENV || 'development'}`,
			`.env.${process.env.NODE_ENV || 'development'}.local`,
		];
	}
	let config = loadEnvFiles(opts);

	if (opts.ignoreVars) {
		config = {
			...config,
			...process.env,
		};
	}

	const keys = Object.keys(config).filter((key) => !(key in process.env));
	keys.forEach((key) => (process.env[key] = config[key]));

	return config;
}

module.exports = config;
