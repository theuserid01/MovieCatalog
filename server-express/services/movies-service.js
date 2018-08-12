const Movie = require('../data/Movie')

const createMovieAsync = async (data) => {
    return await Movie.create(data)
}

const deleteMovieAsync = async (id) => {
    const movie = await getMovieByIdAsync(id)

    return await movie.remove()
}

const editMovieAsync = async (id, data) => {
    const movie = await getMovieByIdAsync(id)

    return await movie.update(data)
}

const getAllMoviesAsync = async () => {
    return await Movie
        .find({})
        .select('_id genres imageUrl title')
        .sort('-creationDate')
}

const getMovieByIdAsync = async (id) => {
    return await Movie.findById(id)
}

module.exports = {
    createMovieAsync,
    deleteMovieAsync,
    editMovieAsync,
    getAllMoviesAsync,
    getMovieByIdAsync
}
