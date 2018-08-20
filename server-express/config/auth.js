const jwt = require('jsonwebtoken')

const constants = require('../common/constants')
const movieService = require('../services/movies-service')
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
        try {
            const authTokenUser = await usersService.getUserByIdAsync(userId)

            if (authTokenUser == null) {
                const message = 'User not found with provided token id!'
                returnNotFound(res, message)
                return
            }

            req.authTokenUser = authTokenUser
            next()

        } catch (err) {
            catchErr(res, err)
        }
    })
}

const isInRole = (role) => {
    return (req, res, next) => {
        isAuthenticated(req, res, () => {
            if (req.authTokenUser.roles.indexOf(role) > -1) {
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

    if (!req.body ||
        typeof req.body.email !== 'string' ||
        req.body.email.trim().length === 0) {
        errors.email = 'Email is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Email is required!',
            success: false
        })
    }

    next()
}

const isValidParamId = async (req, res, next) => {
    const errors = {}
    const id = req.params.id

    if (id === 'undefined') {
        console.log('bla', id)
        return res.status(400).json({
            errors: errors,
            data: {},
            message: 'Param id in url is undefined!',
            success: false
        })
    }

    next()
}

const isValidParamIdMovie = async (req, res, next) => {
    const id = req.params.id

    try {
        const movie = await movieService.getMovieByIdAsync(id)

        if (movie == null) {
            const message = 'Movie not found with provided url param id!'
            returnNotFound(res, message)
            return
        }

        req.movie = movie

    } catch (err) {
        catchErr(res, err)
    }

    next()
}

const isValidParamIdUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const paramIdUser = await usersService.getUserByIdAsync(id)

        if (paramIdUser == null) {
            const message = 'User not found with provided url param id!'
            returnNotFound(res, message)
            return
        }

        req.paramIdUser = paramIdUser

    } catch (err) {
        catchErr(res, err)
    }

    next()
}

const isValidPassword = async (req, res, next) => {
    const errors = {}

    if (!req.body ||
        typeof req.body.password !== 'string' ||
        req.body.password.trim().length === 0) {
        errors.password = 'Password is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Password is required!',
            success: false
        })
    }

    next()
}

const isValidUsername = async (req, res, next) => {
    const errors = {}

    if (!req.body ||
        typeof req.body.username !== 'string' ||
        req.body.username.trim().length === 0) {
        errors.username = 'Username is required!'
        return res.status(200).json({
            errors: errors,
            data: {},
            message: 'Username is required!',
            success: false
        })
    }

    next()
}

module.exports = {
    isAuthenticated,
    isInRole,
    isValidEmail,
    isValidParamId,
    isValidParamIdMovie,
    isValidParamIdUser,
    isValidPassword,
    isValidUsername
}

function catchErr(res, err) {
    console.log('ERROR_NAME:', err.name)
    console.log('ERROR_MESSAGE:', err.message)
    return res.status(500).json({
        errors: {},
        data: {},
        message: 'Server error!',
        success: false
    })
}

function returnNotFound(res, message) {
    return res.status(404).json({
        errors: {},
        data: {},
        message: message,
        success: false
    })
}
