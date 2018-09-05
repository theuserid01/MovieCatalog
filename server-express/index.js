// Basic config
const dbName = 'MovieCatalogProjectDefense'
const connectionString = `mongodb://localhost:27017/${dbName}`
const port = process.env.PORT || 5000

// Initialize app
const app = require('express')()

// Initialize database
require('./config/database')(connectionString)

// Initialize server
require('./config/express')(app)

// Load routes
require('./config/routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}...`))
