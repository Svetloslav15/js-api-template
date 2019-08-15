const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');

const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Invalid credentials!';
const SUCCESSFULLY_LOGIN_MESSAGE = 'Successfully login!';

module.exports = {
    signUp: async (req, username, password, firstName, lastName) => {
        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, password);
        let user = await User.findOne({username: username});
        let result = {
            isValid: false
        };
        if (!user) {
            let user;
            try {
                user = await User.create({
                    username,
                    hashedPassword,
                    salt,
                    firstName,
                    lastName,
                    orders: [],
                    roles: ['User']
                });
            }
            catch (error) {
                result.message = error;
            }
            const token = jwt.sign({
                username: user.username,
                userId: user._id.toString()
            }, 'somesupersecret', {expiresIn: '4h'});
            req.session.userId = user._id.toString();
            let data = {
                token,
                userId: user._id.toString(),
                username: user.username,
                success: true,
                roles: user.roles,
            };
            result.isValid = true;
            result.data = data;
        }
        return result;
    },
    signIn: async (req, username, password) => {
        let user = await User.findOne({username: username});
        let result = {
            isValid: false,
            message: ''
        };
        let currHashedPass = encryption.generateHashedPassword(user.salt, password);
        if (!user || (user.hashedPassword !== currHashedPass)) {
            result.message = INVALID_CREDENTIALS_ERROR_MESSAGE;
            return result;
        }

        const token = jwt.sign({
            username: user.username,
            userId: user._id.toString()
        }, 'somesupersecret', {expiresIn: '4h'});
        req.session.userId = user._id.toString();
        result.message = SUCCESSFULLY_LOGIN_MESSAGE;
        result.data = {
            token,
            userId: user._id.toString(),
            username: user.username,
            success: true,
            roles: user.roles
        };
        return result;
    }
};