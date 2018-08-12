const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => {
    /**
     * Middleware
     * Parse incoming request bodies (form data).
     * The 'extended' syntax allows for rich objects and arrays
     * to be encoded into the URL-encoded format.
     */
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    /**
     * Middleware
     * Enables CORS (cross-origin resource sharing).
     */
    app.use(cors())
}
