import api from './api'

let movieDetails = {
    _id: '01',
    countries: 'Australia, USA',
    genres: 'Action, Adventure, Sci-Fi',
    imageUrl: 'https://t0.gstatic.com/images?q=tbn:ANd9GcQuK41mExh1Qv3kbXoxohWYGlcstOQ6zEnnNdSI2BGIKywQwgRI',
    languages: 'English, Russian',
    synopsis: 'Very good movie.',
    productionYear: 2015,
    title: 'Mad Max: Fury Road'
}

const moviesService = {
    allGet: async () => {
        const axiosResponse = await api.get('/movies/all')
        return axiosResponse.data
    },
    allGetMock: async () => {
        let movies = []
        for (let i = 1; i <= 10; i++) {
            let index = i < 10 ? `0${i}` : i
            let temp = JSON.parse(JSON.stringify(movieDetails))
            temp._id = index
            temp.title = temp.title + index
            movies.push(temp)
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: {
                        movies,
                        movieDetails
                    },
                    message: 'Get movies successful!',
                    success: true
                })
            }, 100)
        })
    },
    createPost: async (data) => {
        const axiosResponse = await api.post('/movies/create', data)
        return axiosResponse.data
    },
    createPostMock: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: data,
                    message: 'Create movie successful!',
                    success: true
                })
            }, 100)
        })
    },
    deleteGet: async (id) => {
        const axiosResponse = await api.get('/movies/delete/' + id)
        return axiosResponse.data
    },
    deletePost: async (id, data) => {
        const axiosResponse = await api.post('/movies/delete/' + id, data)
        return axiosResponse.data
    },
    detailsGet: async (id) => {
        const axiosResponse = await api.get('/movies/all/' + id)
        return axiosResponse.data
    },
    detailsGetMock: async (id) => {
        movieDetails._id = id
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: {
                        movies: {},
                        movieDetails
                    },
                    message: 'Get movies successful!',
                    success: true
                })
            }, 100)
        })
    },
    editGet: async (id) => {
        const axiosResponse = await api.get('/movies/edit/' + id)
        return axiosResponse.data
    },
    editPost: async (id, data) => {
        const axiosResponse = await api.post('/movies/edit/' + id, data)
        return axiosResponse.data
    }
}

export default moviesService
