'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const {expand: dotenvExpand} = require('dotenv-expand');

function loadEnvFiles(options) {
	let encoding = 'utf8';
	let debug = false;
	const files = Array.isArray(options.path)
		? options.path
		: [options.path || path.resolve(process.cwd(), '.env')];

	if (options.encoding != null) {
		encoding = options.encoding;
	}

	if (options.debug != null) {
		debug = options.debug;
	}

	let config = {};
	for (const file of files) {
		if (fs.existsSync(file)) {
			config = Object.assign(config, dotenv.parse(fs.readFileSync(file, {encoding}), {debug}));
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

	if (!opts.path) {
		opts.path = [
			'.env',
			'.env.local',
			`.env.${process.env.NODE_ENV || 'development'}`,
			`.env.${process.env.NODE_ENV || 'development'}.local`,
		];
	} else {
		opts.path = opts.path.split(',');
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
