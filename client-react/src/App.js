import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import store from './redux/store'

import MoviesAllPage from './components/movies/AllPage'
import MoviesCreatePage from './components/movies/CreatePage'
import MoviesDeletePage from './components/movies/DeletePage'
import MoviesEditPage from './components/movies/EditPage'

import UsersAllPage from './components/users/AllPage'
import UsersDeletePage from './components/users/DeletePage'
import UsersEditDetailsPage from './components/users/EditDetailsPage'
import UsersEditPasswordPage from './components/users/EditPasswordPage'
import UsersEditRolesPage from './components/users/EditRolesPage'
import UsersSignInPage from './components/users/SignInPage'
import UsersSignUpPage from './components/users/SignUpPage'

import AdminRoute from './helpers/AdminRoute'
import AuthRoute from './helpers/AuthRoute'
import Navbar from './components/shared/Navbar'
import NotFound from './components/shared/NotFound'

class App extends React.Component {
    render() {
        const isAdmin = store.getState().users.signIn.isAdmin
        const isAuthenticated = store.getState().users.signIn.isAuthenticated
        return (
            <div className="App">
                <header>
                    <Navbar />
                </header>
                <main>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={MoviesAllPage}
                        />
                        <Route
                            path="/users/signin"
                            component={UsersSignInPage}
                        />
                        <Route
                            path="/users/signup"
                            component={UsersSignUpPage}
                        />
                        (// Movies Routes)
                        <Route
                            path="/movies/all"
                            component={MoviesAllPage}
                        />
                        <Route
                            path="/movies/all/:id"
                            component={MoviesAllPage}
                        />
                        <AuthRoute
                            path="/movies/create"
                            auth={isAuthenticated}
                            component={MoviesCreatePage}
                        />
                        <AdminRoute
                            path="/movies/delete/:id"
                            auth={isAdmin}
                            component={MoviesDeletePage}
                        />
                        <AuthRoute
                            path="/movies/edit/:id"
                            auth={isAuthenticated}
                            component={MoviesEditPage}
                        />
                        (// Users Routes)
                        <AdminRoute
                            path="/users/all"
                            auth={isAdmin}
                            component={UsersAllPage}
                        />
                        <AdminRoute
                            path="/users/delete/:id"
                            auth={isAdmin}
                            component={UsersDeletePage}
                        />
                        <AuthRoute
                            path="/users/edit/details/:id"
                            auth={isAuthenticated}
                            component={UsersEditDetailsPage}
                        />
                        <AuthRoute
                            path="/users/edit/password/:id"
                            auth={isAuthenticated}
                            component={UsersEditPasswordPage}
                        />
                        <AdminRoute
                            path="/users/edit/roles/:id"
                            auth={isAdmin}
                            component={UsersEditRolesPage}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default withRouter(App)
