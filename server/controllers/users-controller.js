const User = require('mongoose').model('User');
const usersService = require('../services/usersService');
const StatusCodes = require('../enums/status-codes');

const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Invalid credentials!';
const SUCCESSFULLY_REGISTER_MESSAGE = 'Successfully register!';
const USERNAME_EXISTS_MESSAGE = 'Successfully register!';
const LOGOUT_MESSAGE = 'Logout successfully!';

module.exports = {
    signUp: async (req, res) => {
        const {username, password, repeatedPassword, firstName, lastName} = req.body;
        let statusCode = StatusCodes.OK;
        let message = INVALID_CREDENTIALS_ERROR_MESSAGE;
        let data = req.body;
        let success = true;

        if (username.trim() === '' || password.trim() === '' ||
            repeatedPassword.trim() !== password || firstName.trim() === '' ||
            lastName.trim() === '') {
            statusCode = StatusCodes.UnprocessableEntity;
            message = INVALID_CREDENTIALS_ERROR_MESSAGE;
            success = false;
        }
        let result = await usersService.signUp(req, username, password, firstName, lastName);
        if (!result.isValid) {
            statusCode = StatusCodes.UnprocessableEntity;
            message = USERNAME_EXISTS_MESSAGE;
            success = false;
        }
        else {
            data = result.data;
            message = SUCCESSFULLY_REGISTER_MESSAGE;
        }
        res.status(statusCode)
            .json({
                data,
                message,
                success
            });
    },
    signIn: async (req, res) => {
        const {username, password} = req.body;
        let statusCode = StatusCodes.OK;
        let message = '';
        let success = true;
        let data = req.body;
        if (username.trim() === '' || password.trim() === '') {
            statusCode = StatusCodes.UnprocessableEntity;
            message = INVALID_CREDENTIALS_ERROR_MESSAGE;
            success = false;
        }
        let result = await usersService.signIn(req, username, password);
        if (!result.isValid){
            statusCode = StatusCodes.Unauthorized;
            message = result.message;
            success = false;
        }
        else {
            data = result.data;
            success = true;
        }
        res.status(statusCode)
            .json({
                data,
                message,
                success
            });
    },
    logout: (req, res) => {
        res.setHeader("Authorization", "");
        res.status(StatusCodes.OK)
            .json({
                message: LOGOUT_MESSAGE,
                success: true
            });
    }
};