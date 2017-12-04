const path = require('path');
const isomorphicFetch = require('isomorphic-fetch');

module.exports = {
  moduleDirectories: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules'),
  ],
  globals: {
    Response: global.Response,
    Headers: global.Headers,
    Request: global.Request,
  }
};