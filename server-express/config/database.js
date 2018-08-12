const mongoose = require('mongoose')
const Movie = require('../data/Movie')
const User = require('../data/User')

module.exports = (connectionString) => {
    mongoose.connect(connectionString)
    let db = mongoose.connection

    db.once('open', err => {
        if (err) {
            throw err
        }

        console.log('MongoDB ready!')

        // Seed movies
        Movie.seedMovies()

        // Create admin & users if not present
        User.seedUsers()
    })

    db.on('error', err => console.log(`Database error: ${err}`))
}
