const moviesService = require('../services/movies-service')

module.exports = {
    actionIndex: async (req, res) => {
        const errors = {}
        let id = req.body.id
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
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Get movies failed!',
                success: false
            })
        }
    },
    actionCreatePost: async (req, res) => {
        const errors = {}
        const reqMovie = req.body

        if (!reqMovie ||
            typeof reqMovie.title !== 'string' ||
            reqMovie.title.trim().length === 0) {
            errors.title = 'Title is required!'

        }

        if (!reqMovie || isNaN(reqMovie.productionYear)) {
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
            let data = {
                color: reqMovie.color,
                countries: reqMovie.countries,
                genres: reqMovie.genres,
                imageUrl: reqMovie.imageUrl,
                languages: reqMovie.languages,
                productionYear: reqMovie.productionYear,
                title: reqMovie.title
            }

            const movie = await moviesService.createMovieAsync(data)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Create movie successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Create movie failed!',
                success: false
            })
        }
    },
    actionCrudGet: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            const movie = await moviesService.getMovieByIdAsync(id)

            if (movie == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'Movie not found!',
                    success: false
                })
            }

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Get movie successful!',
                success: true
            })
        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Get movie failed!',
                success: false
            })
        }

    },
    actionDeletePost: async (req, res) => {
        const errors = {}
        const id = req.params.id

        try {
            let movie = await moviesService.getMovieByIdAsync(id)

            if (movie == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'Movie not found!',
                    success: false
                })
            }

            movie = await moviesService.deleteMovieAsync(id)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Delete movie successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Delete movie failed!',
                success: false
            })
        }
    },
    actionEditPost: async (req, res) => {
        const errors = {}
        const id = req.params.id
        const reqMovie = req.body

        if (!reqMovie ||
            typeof reqMovie.title !== 'string' ||
            reqMovie.title.trim().length === 0) {
            errors.title = 'Title is required!'

        }

        if (!reqMovie || isNaN(reqMovie.productionYear)) {
            errors.productionYear = 'Production year is required!'
        }

        try {
            let movie = await moviesService.getMovieByIdAsync(id)

            if (movie == null) {
                return res.status(404).json({
                    errors: errors,
                    data: {},
                    message: 'Movie not found!',
                    success: false
                })
            }

            const data = {
                colors: reqMovie.colors,
                countries: reqMovie.countries,
                genres: reqMovie.genres,
                imageUrl: reqMovie.imageUrl,
                languages: reqMovie.languages,
                productionYear: reqMovie.productionYear,
                synopsis: reqMovie.synopsis,
                title: reqMovie.title
            }

            movie = await moviesService.editMovieAsync(id, data)

            return res.status(200).json({
                errors: errors,
                data: movie,
                message: 'Edit movie successful!',
                success: true
            })

        } catch (err) {
            console.log('ERROR_NAME:', err.name)
            console.log('ERROR_MESSAGE:', err.message)
            return res.status(200).json({
                errors: errors,
                data: {},
                message: 'Edit movie failed!',
                success: false
            })
        }
    },
}
