const moviesService = require('../services/movies-service')

module.exports = {
    actionIndex: async (req, res) => {
        const errors = {}
        let id = req.params.id
        let movies = []
        let movieDetails = {}

        try {
            if (id) {
                movieDetails = await moviesService.getMovieByIdAsync(id)

                if (movieDetails == null) {
                    return res.status(404).json({
                        errors: errors,
                        data: {
                            movies,
                            movieDetails
                        },
                        message: 'Movie not found!',
                        success: false
                    })
                }

                return res.status(200).json({
                    errors: errors,
                    data: {
                        movies,
                        movieDetails
                    },
                    message: 'Get movies successful!',
                    success: true
                })
            }

            movies = await moviesService.getAllMoviesAsync()
            if (movies.length) {
                id = movies[0]._id
                movieDetails = await moviesService.getMovieByIdAsync(id)
            }

            return res.status(200).json({
                errors: errors,
                data: {
                    movies,
                    movieDetails
                },
                message: 'Get movies successful!',
                success: true
            })
        } catch (err) {
            catchErr(res, err)
        }
    },
    actionCreatePost: async (req, res) => {
        const errors = {}

        if (!req.body ||
            typeof req.body.title !== 'string' ||
            req.body.title.trim().length === 0) {
            errors.title = 'Title is required!'

        }

        if (!req.body || isNaN(req.body.productionYear)) {
            errors.productionYear = 'Production year is required!'
        }

        if (Object.keys(errors).length) {
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Create movie failed!',
                success: false
            })
        }

        try {
            const data = dataMovie(req)

            const movie = await moviesService.createMovieAsync(data)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Create movie successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
    actionCrudGet: async (req, res) => {
        const errors = {}
        const movie = req.movie
        return res.status(200).json({
            errors: errors,
            data: movie,
            message: 'Get movie successful!',
            success: true
        })
    },
    actionDeletePost: async (req, res) => {
        const errors = {}
        let movie = req.movie

        try {
            movie = await moviesService.deleteMovieAsync(movie._id)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Delete movie successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
    actionEditPost: async (req, res) => {
        const errors = {}
        let movie = req.movie

        if (!req.body ||
            typeof req.body.title !== 'string' ||
            req.body.title.trim().length === 0) {
            errors.title = 'Title is required!'

        }

        if (!req.body || isNaN(req.body.productionYear)) {
            errors.productionYear = 'Production year is required!'
        }


        if (Object.keys(errors).length) {
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit movie failed!',
                success: false
            })
        }

        try {
            const data = dataMovie(req)

            movie = await moviesService.editMovieAsync(movie, data)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Edit movie successful!',
                success: true
            })

        } catch (err) {
            catchErr(res, err)
        }
    },
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

function dataMovie(req) {
    return {
        colors: req.body.colors,
        countries: req.body.countries,
        genres: req.body.genres,
        imageUrl: req.body.imageUrl,
        languages: req.body.languages,
        productionYear: req.body.productionYear,
        synopsis: req.body.synopsis,
        title: req.body.title
    }
}
