const jwt = require('jsonwebtoken')

const constants = require('../common/constants')
const usersService = require('../services/users-service')

const isAuthenticated = (req, res, next) => {
    if (req.headers.authorization == null) {
        return res.status(401).json({
            errors: {},
            data: {},
            message: 'Authorization header is required!',
            success: false
        })
    }

    // Extract token from the authorization header 'Bearer <token>'
    const token = req.headers['authorization'].split(' ')[1]
    if (token == null) {
        return res.status(401).json({
            errors: {},
            data: {},
            message: 'Authorization bearer <token> is required!',
            success: false
        })
    }

    jwt.verify(token, constants.SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(401).json({
                errors: {},
                data: {},
                message: 'Authorization token is required!',
                success: false
            })
        }

        const userId = data.authKey
        let user = await usersService
            .getUserByIdAsync(userId)

        if (user == null) {
            return res.status(404).json({
                errors: {},
                data: {},
                message: 'User not found!',
                success: false
            })
        }

        req.user = user
        next()
    })
}

const isInRole = (role) => {
    return (req, res, next) => {
        isAuthenticated(req, res, () => {
            if (req.user.roles.indexOf(role) > -1) {
                next()
            } else {
                return res.status(403).json({
                    errors: {},
                    data: {},
                    message: 'Access forbidden!',
                    success: false
                })
            }
        })
    }
}

const isValidEmail = async (req, res, next) => {
    const errors = {}
    const reqUser = req.body

    if (!reqUser ||
        typeof reqUser.email !== 'string' ||
        reqUser.email.trim().length === 0) {
        errors.email = 'Email is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Request failed!',
            success: false
        })
    }

    next()
}

const isValidPassword = async (req, res, next) => {
    const errors = {}
    const reqUser = req.body

    if (!reqUser ||
        typeof reqUser.password !== 'string' ||
        reqUser.password.trim().length === 0) {
        errors.password = 'Password is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Request failed!',
            success: false
        })
    }

    next()
}

const isValidUsername = async (req, res, next) => {
    const errors = {}
    const reqUser = req.body

    if (!reqUser ||
        typeof reqUser.username !== 'string' ||
        reqUser.username.trim().length === 0) {
        errors.username = 'Username is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Request failed!',
            success: false
        })
    }

    next()
}

module.exports = {
    isAuthenticated,
    isInRole,
    isValidEmail,
    isValidPassword,
    isValidUsername
}
