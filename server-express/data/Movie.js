const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

const movieSchema = new mongoose.Schema({
    colors: {
        type: mongoose.SchemaTypes.String
    },
    countries: {
        type: mongoose.SchemaTypes.String
    },
    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    },
    genres: {
        type: mongoose.SchemaTypes.String
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
    },
    languages: {
        type: mongoose.SchemaTypes.String
    },
    productionYear: {
        type: mongoose.SchemaTypes.Number,
        min: 1900,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    synopsis: {
        type: mongoose.SchemaTypes.String
    },
    title: {
        type: mongoose.SchemaTypes.String,
        minlength: 1,
        maxlength: 100,
        required: REQUIRED_VALIDATION_MESSAGE
    },
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie

module.exports.seedMovies = () => {
    Movie.find({})
        .then(movies => {
            if (movies.length > 0) {
                return
            }

            for (let i = 1; i <= 10; i++) {
                const index = i >= 10 ? i : `0${i}`
                Movie.create({
                    colors: 'Color, Black and White',
                    countries: 'Australia, USA',
                    genres: 'Action, Adventure, Sci-Fi',
                    imageUrl: 'https://t0.gstatic.com/images?q=tbn:ANd9GcQuK41mExh1Qv3kbXoxohWYGlcstOQ6zEnnNdSI2BGIKywQwgRI',
                    languages: 'English, Russian',
                    synopsis: 'Very good movie.',
                    productionYear: 2015,
                    title: `Mad Max: Fury Road-${index}`
                })
            }
        })
}
