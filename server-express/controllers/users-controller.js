const jwt = require('jsonwebtoken')

const constants = require('../common/constants')
const encryption = require('../infrastructure/encryption')
const usersService = require('../services/users-service')

module.exports = {
    actionAll: async (req, res) => {
        const errors = {}
        const pageSize = 15
        const page = Math.abs(parseInt(req.query.page)) || 1
        const search = req.query.search

        const countUsers = await usersService
            .countUserAsync(search)
        const users = await usersService
            .getAllUsersAsync(countUsers, search, page, pageSize)

        const currentPage = page
        const totalPages = Math.ceil(countUsers / pageSize)
        const totalPagesRange = []
        for (let i = 1; i <= totalPages; i++) {
            totalPagesRange.push(i)
        }

        const usersPagination = {
            currentPage: currentPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            search: search,
            queryPage: `&page=${currentPage}`,
            querySearch: search ? `&search=${search}` : '',
            totalPages: totalPages,
            totalPagesRange: totalPagesRange
        }

        return res.status(200).json({
            errors: errors,
            data: {
                users,
                usersPagination
            },
            message: 'Get all users successful!',
            success: true
        })
    },
    actionDeleteGet: async (req, res) => {
        const errors = {}
        const paramIdUser = req.paramIdUser
        return res.status(200).json({
            errors: errors,
            data: dataUser(paramIdUser),
            message: 'Get user details successful!',
            success: true
        })
    },
    actionDeletePost: async (req, res) => {
        const errors = {}
        const paramIdUser = req.paramIdUser

        try {
            await usersService.deleteUserAsync(paramIdUser._id)

            return res.status(200).json({
                errors: errors,
                data: dataUser(paramIdUser),
                message: 'Delete user successful!',
                success: true
            })
        } catch (err) {
            catchErr(res, err)
        }
    },
    actionEditDetailsGet: async (req, res) => {
        const errors = {}
        const paramIdUser = req.paramIdUser

        const authTokenUser = req.authTokenUser
        const authId = JSON.stringify(authTokenUser._id)
        const paramId = JSON.stringify(paramIdUser._id)
        const isNotAdmin = authTokenUser
            .roles.indexOf(constants.ADMINISTRATOR_ROLE) === -1 &&
            authId !== paramId
        if (isNotAdmin) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden!',
                success: false
            })
        }

        return res.status(200).json({
            errors: errors,
            data: dataUser(paramIdUser),
            message: 'Get user details successful!',
            success: true
        })
    },
    actionEditDetailsPost: async (req, res) => {
        const errors = {}
        let paramIdUser = req.paramIdUser

        const authTokenUser = req.authTokenUser
        const authId = JSON.stringify(authTokenUser._id)
        const paramId = JSON.stringify(paramIdUser._id)
        const isNotAdmin = authTokenUser
            .roles.indexOf(constants.ADMINISTRATOR_ROLE) === -1 &&
            authId !== paramId
        if (isNotAdmin) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden!',
                success: false
            })
        }

        try {
            if (req.body.email !== paramIdUser.email) {
                const isEmailTaken = await usersService
                    .isEmailTaken(req.body.email)
                if (isEmailTaken) {
                    errors.email = 'Email taken!'
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Edit user details failed: Email taken!',
                        success: false
                    })
                }
            }

            if (req.body.username !== paramIdUser.username) {
                const isUsernameTaken = await usersService
                    .isUsernameTaken(req.body.username)
                if (isUsernameTaken) {
                    errors.username = 'Username taken!'
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Edit user details failed: Username taken!',
                        success: false
                    })
                }
            }

            const data = {
                email: req.body.email,
                username: req.body.username
            }

            paramIdUser = await usersService.editUserAsync(paramIdUser, data)

            return res.status(200).json({
                errors: errors,
                data: dataUser(paramIdUser),
                message: 'Edit user details successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
    actionEditPasswordPost: async (req, res) => {
        const errors = {}
        const authTokenUser = req.authTokenUser
        let paramIdUser = req.paramIdUser

        const authId = JSON.stringify(authTokenUser._id)
        const paramId = JSON.stringify(paramIdUser._id)
        if (authId !== paramId) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden bla!',
                success: false
            })
        }

        if (!req.body ||
            typeof req.body.passwordCurrent !== 'string' ||
            req.body.passwordCurrent.trim().length === 0) {
            errors.passwordCurrent = 'Password is required!'
        }

        if (!req.body ||
            typeof req.body.passwordNew !== 'string' ||
            req.body.passwordNew.trim().length === 0) {
            errors.passwordNew = 'Password is required!'
        }

        if (!req.body ||
            typeof req.body.passwordRepeatNew !== 'string' ||
            req.body.passwordRepeatNew.trim().length === 0) {
            errors.passwordRepeatNew = 'Password is required!'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit password failed!',
                success: false
            })
        }

        if (req.body.passwordNew !== req.body.passwordRepeatNew) {
            errors.passwordNew = 'Passwords do not match!'
            errors.passwordRepeatNew = 'Passwords do not match!'
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit password failed!',
                success: false
            })
        }

        try {
            if (!paramIdUser.authenticate(req.body.passwordCurrent)) {
                errors.passwordCurrent = 'Invalid password!'
                return res.status(200).json({
                    errors: errors,
                    data: {},
                    message: 'Password authentication failed!',
                    success: false
                })
            }

            const salt = encryption.generateSalt()
            const hashedPass = encryption
                .generateHashedPassword(salt, req.body.passwordNew)
            const data = {
                hashedPass,
                salt
            }

            paramIdUser = await usersService.editUserAsync(paramIdUser, data)

            return res.status(200).json({
                errors: errors,
                data: dataUser(paramIdUser),
                message: 'Edit password successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
    actionEditRolesGet: async (req, res) => {
        const errors = {}
        const paramIdUser = req.paramIdUser

        try {
            const roles = []
            const allRoles = constants.USER_ROLES
            const availableRoles = constants.USER_ROLES
                .filter(elem => -1 === paramIdUser.roles.indexOf(elem))
            const currentRoles = paramIdUser.roles
            const selectedRoles = currentRoles
            const data = {
                roles,
                allRoles,
                availableRoles,
                currentRoles,
                selectedRoles
            }

            return res.status(200).json({
                errors: errors,
                data: data,
                message: 'Edit user roles successful!',
                success: true
            })
        } catch (err) {
            catchErr(res, err)
        }
    },
    actionEditRolesPost: async (req, res) => {
        const errors = {}
        let paramIdUser = req.paramIdUser

        try {
            const roles = req.body.roles
            if (roles == null) {
                return res.status(400).json({
                    errors: errors,
                    data: {},
                    message: 'Roles undefined!',
                    success: false
                })
            }

            const data = { roles }
            paramIdUser = await usersService.editUserAsync(paramIdUser, data)

            return res.status(200).json({
                errors: errors,
                data: dataUser(paramIdUser),
                message: 'Edit roles successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
    actionSignInPost: async (req, res) => {
        const errors = {}

        try {
            const user = await usersService
                .getUserByUsernameAsync(req.body.username)

            if (user == null) {
                errors.credentials = 'Invalid credentials!'
                return res.status(401).json({
                    errors: { errors },
                    data: {},
                    message: 'Invalid credentials!',
                    success: false
                })
            }

            if (!user.authenticate(req.body.password)) {
                errors.credentials = 'Invalid credentials!'
                return res.status(401).json({
                    errors: errors,
                    data: {},
                    message: 'Invalid credentials!',
                    success: false
                })
            }

            jwt.sign({ authKey: user._id }, constants.SECRET_KEY, (err, authToken) => {
                if (err) {
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Generating token failed!',
                        success: false
                    })
                }

                const data = {
                    _id: user._id,
                    authToken: authToken,
                    email: user.email,
                    isAdmin: user.roles.includes(constants.ADMINISTRATOR_ROLE),
                    isAuthenticated: true,
                    roles: user.roles,
                    username: user.username
                }

                return res.status(200).json({
                    errors: errors,
                    data: data,
                    message: 'Login successful!',
                    token: authToken,
                    success: true
                })
            })
        } catch (err) {
            catchErr(res, err)
        }

    },
    actionSignUpPost: async (req, res) => {
        const errors = {}

        const isUsernameTaken = await usersService
            .isUsernameTaken(req.body.username)
        if (isUsernameTaken) {
            errors.username = 'Username taken!'
        }

        const isEmailTaken = await usersService
            .isEmailTaken(req.body.email)
        if (isEmailTaken) {
            errors.email = 'Email taken!'
        }

        if (req.body.password !== req.body.passwordRepeat) {
            errors.password = 'Passwords do not match!'
            errors.passwordRepeat = 'Passwords do not match!'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Registration failed!',
                success: false
            })
        }

        try {
            const salt = encryption.generateSalt()
            const hashedPass = encryption
                .generateHashedPassword(salt, req.body.password)

            const data = {
                email: req.body.email,
                hashedPass: hashedPass,
                salt: salt,
                username: req.body.username
            }

            const user = await usersService.createUserAsync(data)

            jwt.sign({ authKey: user._id }, constants.SECRET_KEY, (err, authToken) => {
                if (err) {
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Genrating token failed!',
                        success: false
                    })
                }

                const data = {
                    _id: user._id,
                    authToken: authToken,
                    email: user.email,
                    isAdmin: user.roles.includes(constants.ADMINISTRATOR_ROLE),
                    isAuthenticated: true,
                    roles: user.roles,
                    username: user.username
                }

                return res.status(200).json({
                    errors: errors,
                    data: data,
                    message: 'Registration successful!',
                    token: authToken,
                    success: true
                })
            })
        } catch (err) {
            catchErr(res, err)
        }
    }
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

function dataUser(user) {
    return {
        _id: user._id,
        email: user.email,
        roles: user.roles,
        username: user.username
    }
}
