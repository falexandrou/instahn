require('isomorphic-fetch');
const path = require('path');

// Mock datetime locale output
Object.defineProperty(Date.prototype, 'toLocaleDateString', { value: () => '2017-01-09', writable: true });
Object.defineProperty(Date.prototype, 'toLocaleTimeString', { value: () => '19:00', writable: true });

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
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf)$": path.resolve( __dirname, 'tests/mocks/files.js'),
    "\\.(css|less|scss|sass)$": path.resolve( __dirname, 'tests/mocks/styles.js'),
  },
};