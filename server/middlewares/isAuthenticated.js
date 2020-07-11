const env = process.env.NODE_ENV || 'development';
const settings = require('./server/config/settings')[env];
const jwt = require('jsonwebtoken');
const StatusCodes = require('../enums/status-codes');

module.exports = (req, res, next) => {
    const authHeaders = req.get('Authorization');
    if (!authHeaders) {
        return res.status(StatusCodes.Unauthorized)
            .json({ message: 'Not authenticated.' })
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, settings.jwtSecretString)
    } catch(error) {
        return res.status(StatusCodes.Unauthorized)
            .json({ message: 'Token is invalid.', error });
    }

    if (!decodedToken) {
        return res.status(StatusCodes.Unauthorized)
            .json({ message: 'Not authenticated.' });
    }

    req.userId = decodedToken.userId;
    next();
};