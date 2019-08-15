const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/template-db',
    port: 1337
  },
  production: {
    port: process.env.PORT
  }
};