const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/template-db',
        port: 5000,
        sessionSecretString: 'secret-16+*$template',
        jwtSecretString: 'somesupersecret'
    },
    production: {
        port: process.env.PORT,
        db: '',
        sessionSecretString: 'secret-16+*$template',
        jwtSecretString: 'somesupersecret'
    }
};