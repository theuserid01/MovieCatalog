const host = 'http://localhost:5000'
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

export default {
    movieCreatePost: async (data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/movies/create', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    movieCreatePostMock: async (data) => {
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
    movieDeleteGet: async (id) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/movies/delete/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    movieDeletePost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/movies/delete/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    movieEditGet: async (id) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/movies/edit/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    movieEditPost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/movies/edit/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    moviesGet: async () => {
        const res = await fetch(host + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    moviesGetMock: async () => {
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
    movieDetailsIndexGet: async (id) => {
        const res = await fetch(host + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })

        return await res.json()
    },
    movieDetailsIndexGetMock: async (id) => {
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
    userDeleteGet: async (id) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/admin/users/delete/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    userDeletePost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/admin/users/delete/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    userEditDetailsGet: async (id) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/users/edit/details/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    userEditDetailsGetMock: async (id) => {
        const data = {
            _id: id,
            email: 'admin@gmail.com',
            username: 'admin'
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: data,
                    message: 'Edit user details successful!',
                    success: true
                })
            }, 100)
        })
    },
    userEditDetailsPost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/users/edit/details/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    userEditRolesGet: async (id) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/admin/users/edit/roles/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    userEditRolesGetMock: async (id) => {
        const data = {
            _id: id,
            allRoles: ['Administrator', 'Moderator'],
            availableRoles: ['Moderator'],
            currentRoles: ['Administrator'],
            selectedRoles: ['Administrator']
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: data,
                    message: 'Edit user roles successful!',
                    success: true
                })
            }, 100)
        })
    },
    userEditRolesPost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/admin/users/edit/roles/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    userEditPasswordPost: async (id, data) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/users/edit/password/' + id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    usersGet: async (query) => {
        const authToken = localStorage.getItem('authToken')
        const res = await fetch(host + '/admin/users/all' + query, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })

        return await res.json()
    },
    usersGetMock: async () => {
        let users = []
        let _id = '01'
        let email = 'admin@gmail.com'
        let roles = ['Administrator', 'Moderator']
        let username = 'admin'

        for (let i = 1; i <= 60; i++) {
            if (i > 1) {
                let index = i < 10 ? `0${i}` : i
                _id = index
                email = `user${index}@gmail.com`
                roles = []
                username = `user${index}`
            }
            users.push({
                _id: _id,
                email: email,
                roles: roles,
                username: username
            })
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: { users },
                    message: 'Get users successful!',
                    success: true
                })
            }, 100)
        })
    },
    signIn: async (data) => {
        const res = await fetch(host + '/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    signInMock: async (data) => {
        data = {
            _id: '01',
            authToken: 'mockToken',
            roles: ['Administrator'],
            password: 'Admin1',
            username: 'admin'
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: data,
                    message: 'Log in successful!',
                    success: true
                })
            }, 100)
        })
    },
    signUp: async (data) => {
        const res = await fetch(host + '/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    },
    signUpMock: async (data) => {
        data = {
            _id: '01',
            authToken: 'mockToken',
            email: 'admin@gmail.com',
            roles: ['Administrator'],
            password: 'Admin1',
            username: 'admin'
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    errors: {},
                    data: data,
                    message: 'Registration successful!',
                    success: true
                })
            }, 100)
        })
    }
}
