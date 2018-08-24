import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import observer from './services/observer'

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

import AdminRoute from './components/common/AdminRoute'
import AuthRoute from './components/common/AuthRoute'
import Navbar from './components/common/Navbar'
import NotFound from './components/common/NotFound'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            isAdmin: false,
            isAuthenticated: false,
            username: ''
        }

        observer.onLogin = this.onLogin.bind(this)
    }

    onLogin = () => {
        let user = JSON.parse(localStorage.getItem('user'))

        if (user.authToken === null) {
            console.log('Failed authToken!')
            return
        }

        localStorage.setItem('authToken', user.authToken)

        if (user.roles && user.roles.includes('Administrator')) {
            this.setState({ isAdmin: true })
        }

        this.setState({
            _id: user._id,
            isAuthenticated: true,
            username: user.username
        })

        this.props.history.push('/')
    }

    onLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
        this.setState({
            _id: '',
            isAdmin: false,
            isAuthenticated: false,
            username: ''
        })
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Navbar onLogout={this.onLogout} user={this.state} />
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={MoviesAllPage} user={this.state} />
                        <Route path="/users/signin" component={UsersSignInPage} />
                        <Route path="/users/signup" component={UsersSignUpPage} />
                        (// Movies Routes)
                        <Route path="/movies/all" component={MoviesAllPage} user={this.state} />
                        <Route path="/movies/all/:id" component={MoviesAllPage} user={this.state} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/movies/create" component={MoviesCreatePage} />
                        <AdminRoute auth={this.state.isAdmin} path="/movies/delete/:id" component={MoviesDeletePage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/movies/edit/:id" component={MoviesEditPage} />
                        (// Users Routes)
                        <AdminRoute auth={this.state.isAdmin} path="/users/all" component={UsersAllPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/users/delete/:id" component={UsersDeletePage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/users/edit/details/:id" component={UsersEditDetailsPage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/users/edit/password/:id" component={UsersEditPasswordPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/users/edit/details/:id" component={UsersEditDetailsPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/users/edit/roles/:id" component={UsersEditRolesPage} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default withRouter(App)
