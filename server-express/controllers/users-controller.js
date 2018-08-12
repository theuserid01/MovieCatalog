const jwt = require('jsonwebtoken')

const constants = require('../common/constants')
const encryption = require('../infrastructure/encryption')
const usersService = require('../services/users-service')

module.exports = {
    actionAll: async (req, res) => {
        const errors = {}
        const pageSize = 20
        const page = Math.abs(parseInt(req.query.page)) || 1
        const search = req.query.search

        const countUsers = await usersService
            .countUserAsync(search)
        const users = await usersService
            .getAllUsersAsync(countUsers, search, page, pageSize)

        const currentPage = page
        const totalPages = Math.ceil(countUsers / pageSize)

        const usersPagination = {
            currentPage: currentPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            searchQuery: search ? `&search=${search}` : '',
            totalPages: totalPages
        }

        return res.status(200).json({
            errors: errors,
            data: {
                users,
                usersPagination
            },
            message: 'Request successful!',
            success: true
        })
    },
    actionDeleteGet: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            const user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Get user details successful!',
                success: true
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Get user details failed!',
                success: false
            })
        }
    },
    actionDeletePost: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            const user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            await usersService.deleteUserAsync(id)

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Delete user successful!',
                success: true
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Delete user failed!',
                success: false
            })
        }
    },
    actionEditDetailsGet: async (req, res) => {
        const errors = {}
        const id = req.params.id
        const isNotAdmin = req.user
            .roles.indexOf(constants.ADMINISTRATOR_ROLE) === -1
        // _id obj prop != id string
        if (req.user._id != id && isNotAdmin) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden!',
                success: false
            })
        }

        try {
            const user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Get user details successful!',
                success: true
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Get user details failed!',
                success: false
            })
        }
    },
    actionEditDetailsPost: async (req, res) => {
        const errors = {}
        const id = req.params.id
        const isNotAdmin = req.user
            .roles.indexOf(constants.ADMINISTRATOR_ROLE) === -1
        // _id obj prop != id string
        if (req.user._id != id && isNotAdmin) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden!',
                success: false
            })
        }

        try {
            let user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            const reqUser = req.body

            if (reqUser.email !== user.email) {
                const isEmailTaken = await usersService
                    .isEmailTaken(reqUser.email)
                if (isEmailTaken) {
                    errors.email = 'Email taken!'
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Edit user details failed!',
                        success: false
                    })
                }
            }

            if (reqUser.username !== user.username) {
                const isUsernameTaken = await usersService
                    .isUsernameTaken(reqUser.username)
                if (isUsernameTaken) {
                    errors.username = 'Username taken!'
                    return res.status(200).json({
                        errors: errors,
                        data: {},
                        message: 'Edit user details failed!',
                        success: false
                    })
                }
            }

            const data = {
                email: reqUser.email,
                username: reqUser.username
            }

            user = await usersService.editUserAsync(id, data)

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Edit user details successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit user details failed!',
                success: false
            })
        }
    },
    actionEditPasswordPost: async (req, res) => {
        const errors = {}
        const id = req.params.id
        const authUser = req.user
        const reqUser = req.body

        if (req.user._id != id) {
            return res.status(403).json({
                errors: errors,
                data: {},
                message: 'Access forbidden!',
                success: false
            })
        }

        if (!reqUser ||
            typeof reqUser.currentPassword !== 'string' ||
            reqUser.currentPassword.trim().length === 0) {
            errors.currentPassword = 'Password is required!'
        }

        if (!reqUser ||
            typeof reqUser.newPassword !== 'string' ||
            reqUser.newPassword.trim().length === 0) {
            errors.newPassword = 'Password is required!'
        }

        if (!reqUser ||
            typeof reqUser.repeatNewPassword !== 'string' ||
            reqUser.repeatNewPassword.trim().length === 0) {
            errors.repeatNewPassword = 'Password is required!'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit password failed!',
                success: false
            })
        }

        if (reqUser.newPassword !== reqUser.repeatNewPassword) {
            errors.newPassword = 'Passwords do not match!'
            errors.repeatNewPassword = 'Passwords do not match!'
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit password failed!',
                success: false
            })
        }

        try {
            let user = await usersService
                .getUserByUsernameAsync(authUser.username)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            if (!user.authenticate(reqUser.currentPassword)) {
                errors.currentPassword = 'Invalid password!'
                return res.status(200).json({
                    errors: errors,
                    data: {},
                    message: 'Password authentication failed!',
                    success: false
                })
            }

            const salt = encryption.generateSalt()
            const hashedPass = encryption
                .generateHashedPassword(salt, reqUser.newPassword)
            console.log(reqUser.newPassword, hashedPass)
            const data = {
                hashedPass,
                salt
            }

            user = await usersService.editUserAsync(id, data)

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Edit password successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit password failed!',
                success: false
            })

        }
    },
    actionEditRolesGet: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            const user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

            const allRoles = constants.USER_ROLES
            const availableRoles = constants.USER_ROLES
                .filter(elem => -1 === user.roles.indexOf(elem))
            const currentRoles = user.roles
            const selectedRoles = currentRoles
            const data = {
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
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Get user roles failed!',
                success: false
            })
        }
    },
    actionEditRolesPost: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            let user = await usersService.getUserByIdAsync(id)

            if (user == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'User not found!',
                    success: false
                })
            }

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
            user = await usersService.editUserAsync(id, data)

            return res.status(200).json({
                errors: errors,
                data: user,
                message: 'Edit roles successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit roles failed!',
                success: false
            })
        }
    },
    actionSignInPost: async (req, res) => {
        const errors = {}
        const reqUser = req.body

        try {
            const user = await usersService
                .getUserByUsernameAsync(reqUser.username)

            if (user == null) {
                errors.username = 'Invalid username!'
                return res.status(200).json({
                    errors: errors,
                    data: {},
                    message: 'Login failed!',
                    success: false
                })
            }

            if (!user.authenticate(reqUser.password)) {
                errors.password = 'Invalid password!'
                return res.status(200).json({
                    errors: errors,
                    data: {},
                    message: 'Password authentication failed!',
                    success: false
                })
            }

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
                    roles: user.roles,
                    username: user.username
                }

                return res.status(200).json({
                    errors: errors,
                    data: data,
                    message: 'Login successful!',
                    success: true
                })
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Login failed!',
                success: false
            })
        }

    },
    actionSignUpPost: async (req, res) => {
        const errors = {}
        const reqUser = req.body

        const isUsernameTaken = await usersService
            .isUsernameTaken(reqUser.username)
        if (isUsernameTaken) {
            errors.username = 'Username taken!'
        }

        const isEmailTaken = await usersService
            .isEmailTaken(reqUser.email)
        if (isEmailTaken) {
            errors.email = 'Email taken!'
        }

        if (reqUser.password !== reqUser.repeatPassword) {
            errors.password = 'Passwords do not match!'
            errors.repeatPassword = 'Passwords do not match!'
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
                .generateHashedPassword(salt, reqUser.password)

            const data = {
                email: reqUser.email,
                hashedPass: hashedPass,
                salt: salt,
                username: reqUser.username
            }

            let user = await usersService.createUserAsync(data)

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
                    roles: user.roles,
                    username: user.username
                }

                return res.status(200).json({
                    errors: errors,
                    data: data,
                    message: 'Registration successful!',
                    success: true
                })
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Registration failed!',
                success: false
            })
        }
    }
}
