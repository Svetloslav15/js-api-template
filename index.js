const env = process.env.NODE_ENV || 'development';
const settings = require('./server/config/settings')[env];
const BASE_URL = './server/config/';
const app = require('express')();

require(`${BASE_URL}database`)(settings);
require(`${BASE_URL}express`)(app);
require(`${BASE_URL}routes`)(app);

app.listen(settings.port, () => {
    console.log(`Server listening on port ${settings.port}...`);
});