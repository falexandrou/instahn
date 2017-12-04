require('isomorphic-fetch');
const path = require('path');

module.exports = {
  moduleDirectories: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules'),
  ],
  globals: {
    Response: global.Response,
    Headers: global.Headers,
    Request: global.Request,
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": path.resolve( __dirname, 'tests/mocks/files.js'),
    "\\.(css|less|scss|sass)$": path.resolve( __dirname, 'tests/mocks/styles.js'),
  },
};