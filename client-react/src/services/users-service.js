import api from './api'

const usersService = {
    allGet: async (query) => {
        const axiosResponse = await api.get('/users/all' + query)
        return axiosResponse.data
    },
    allGetMock: async () => {
        let users = []
        let _id = '01'
        let email = 'admin@gmail.com'
        let roles = ['Administrator', 'Moderator']
        let username = 'admin'

        for (let i = 1; i <= 60; i++) {
            if (i > 1) {
                let index = i < 10 ? `0${i}` : `${i}`
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
    deleteGet: async (id) => {
        const axiosResponse = await api.get('/users/delete/' + id)
        return axiosResponse.data
    },
    deletePost: async (id, data) => {
        const axiosResponse = await api.post('/users/delete/' + id, data)
        return axiosResponse.data
    },
    editDetailsGet: async (id) => {
        const axiosResponse = await api.get('/users/edit/details/' + id)
        return axiosResponse.data
    },
    editDetailsGetMock: async (id) => {
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
    editDetailsPost: async (id, data) => {
        const axiosResponse = await api.post('/users/edit/details/' + id, data)
        return axiosResponse.data
    },
    editPasswordPost: async (id, data) => {
        const axiosResponse = await api.post('/users/edit/password/' + id, data)
        return axiosResponse.data
    },
    editRolesGet: async (id) => {
        const axiosResponse = await api.get('/users/edit/roles/' + id)
        return axiosResponse.data
    },
    editRolesGetMock: async (id) => {
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
    editRolesPost: async (id, data) => {
        const axiosResponse = await api.post('/users/edit/roles/' + id, data)
        return axiosResponse.data
    },
    signIn: async (data) => {
        const axiosResponse = await api.post('/users/signin', data)
        return axiosResponse.data
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
        const axiosResponse = await api.post('/users/signup', data)
        return axiosResponse.data
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

export default usersService
