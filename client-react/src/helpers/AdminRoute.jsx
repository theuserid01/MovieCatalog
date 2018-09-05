import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ auth, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            auth
                ? <Component {...props} />
                : (
                    <Redirect
                        to={{
                            pathname: '/users/signin',
                            state: { from: props.location }
                        }}
                    />
                )
        )}
    />
)

export default AdminRoute
