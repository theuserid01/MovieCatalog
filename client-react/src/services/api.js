import axios from 'axios'
import toastr from 'toastr'

import store from '../redux/store'
import usersActions from '../redux/actions/users-actions'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.authToken) {
            config.headers.Authorization = `Bearer ${user.authToken}`
        }

        return config
    },
    (err) => {
        const res = err.response
        toastr.error(res.data.message, 'Error ' + res.status)
        return err.response
    }
)

axios.interceptors.response.use(
    (res) => {
        const body = res.data
        const isGet = res.config.method.toUpperCase() === 'GET'
        const success = body.success ? body.success : false
        if (isGet || !success) {
            return res
        }

        // Set user data in localStorage and redux store
        if (body.data && (body.token || body.data.authToken)) {
            store.dispatch(
                usersActions.creators.signIn(body.data)
            )
            if (res.request.responseURL.includes('signin')) {
                return res
            }
        }

        toastr.success(res.data.message, 'Success!')
        return res
    },
    (err) => {
        const res = err.response
        toastr.error(res.data.message, 'Error ' + res.status)
        return err.response
    }
)

export default axios
