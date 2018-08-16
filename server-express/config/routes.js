const auth = require('./auth')
const constants = require('../common/constants')

const moviesController = require('../controllers/movies-controller')
const usersController = require('../controllers/users-controller')

module.exports = (app) => {
    app.all('/', moviesController.actionIndex)
    app.get('/movies/all', moviesController.actionIndex)

    app.post(
        '/movies/create',
        auth.isAuthenticated,
        moviesController.actionCreatePost)
    app.get(
        '/movies/delete/:id',
        auth.isInRole(constants.ADMINISTRATOR_ROLE),
        moviesController.actionCrudGet)
    app.post(
        '/movies/delete/:id',
        auth.isInRole(constants.ADMINISTRATOR_ROLE),
        moviesController.actionDeletePost)
    app.get(
        '/movies/edit/:id',
        auth.isAuthenticated,
        moviesController.actionCrudGet)
    app.post(
        '/movies/edit/:id',
        auth.isAuthenticated,
        moviesController.actionEditPost)

    app.get(
        '/users/edit/details/:id',
        // auth.isAuthenticated,
        usersController.actionEditDetailsGet
    )
    app.post(
        '/users/edit/details/:id',
        // auth.isAuthenticated,
        auth.isValidUsername,
        auth.isValidEmail,
        usersController.actionEditDetailsPost
    )
    app.post(
        '/users/edit/password/:id',
        // auth.isAuthenticated,
        usersController.actionEditPasswordPost
    )
    app.post(
        '/users/signin',
        auth.isValidUsername,
        auth.isValidPassword,
        usersController.actionSignInPost
    )
    app.post(
        '/users/signup',
        auth.isValidUsername,
        auth.isValidEmail,
        auth.isValidPassword,
        usersController.actionSignUpPost
    )

    // Admin users routes
    app.get(
        '/users/all',
        // auth.isInRole(constants.ADMINISTRATOR_ROLE),
        usersController.actionAll
    )
    app.get(
        '/users/delete/:id',
        // auth.isInRole(constants.ADMINISTRATOR_ROLE),
        usersController.actionDeleteGet
    )
    app.post(
        '/users/delete/:id',
        // auth.isInRole(constants.ADMINISTRATOR_ROLE),
        usersController.actionDeletePost
    )
    app.get(
        '/users/edit/roles/:id',
        // auth.isInRole(constants.ADMINISTRATOR_ROLE),
        usersController.actionEditRolesGet
    )
    app.post(
        '/users/edit/roles/:id',
        //auth.isInRole(constants.ADMINISTRATOR_ROLE),
        usersController.actionEditRolesPost
    )

    // Fallback route
    app.all('*', (req, res) => {
        return res.status(404).json({
            errors: {},
            message: `Page with method ${req.method} not found!`,
            payload: {},
            success: false
        })
    })
}
