import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/users/login',
                state: { from: props.location }
            }}
            />}
    />
)

export default AdminRoute
