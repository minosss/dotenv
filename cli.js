#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('./index.js')();

const crossEnv = require('cross-env');

crossEnv(process.argv.slice(2))
