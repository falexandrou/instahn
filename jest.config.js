const path = require('path');

// Replace global fetch with mock otherwise Response and Request objects are not defined
// https://github.com/jefflau/jest-fetch-mock/issues/13#issuecomment-299413329
const { Response, Headers, Request } = require('whatwg-fetch');

module.exports = {
  moduleDirectories: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules'),
  ],
  globals: {
    Response: Response,
    Headers: Headers,
    Request: Request,
  }
};