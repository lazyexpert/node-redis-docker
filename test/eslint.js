const linter = require('mocha-eslint');
const options = { timeout: 10000 };
const paths = ['./'];

linter(paths, options);
