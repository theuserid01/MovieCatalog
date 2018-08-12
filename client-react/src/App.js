import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import observer from './services/observer'

import CreatePage from './components/Movies/CreatePage'
import HomePage from './components/Home/HomePage'
import LoginPage from './components/Users/LoginPage'
import MoviesDeletePage from './components/Movies/DeletePage'
import MoviesEditPage from './components/Movies/EditPage'
import NotFound from './components/Common/NotFound'
import RegisterPage from './components/Users/RegisterPage'
import UsersPage from './components/Users/UsersPage'
import UsersEditDetailsPage from './components/Users/EditDetailsPage'
import UsersEditRolesPage from './components/Users/EditRolesPage'
import UsersEditPasswordPage from './components/Users/EditPasswordPage'
import UsersDeletePage from './components/Users/DeletePage'

import AdminRoute from './components/Common/AdminRoute'
import AuthRoute from './components/Common/AuthRoute'
import Navbar from './components/Common/Navbar'

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
                        <Route exact path="/" component={HomePage} user={this.state} />
                        <Route path="/movies/all" component={HomePage} user={this.state} />
                        <Route path="/users/login" component={LoginPage} />
                        <Route path="/users/register" component={RegisterPage} />
                        (// Admin Routes)
                        <AdminRoute auth={this.state.isAdmin} path="/admin/users/all" component={UsersPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/admin/users/edit/details/:id" component={UsersEditDetailsPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/admin/users/edit/roles/:id" component={UsersEditRolesPage} />
                        <AdminRoute auth={this.state.isAdmin} path="/admin/users/delete/:id" component={UsersDeletePage} />
                        <AdminRoute auth={this.state.isAdmin} path="/movies/delete/:id" component={MoviesDeletePage} />
                        (// Authenticated Routes)
                        <AuthRoute auth={this.state.isAuthenticated} path="/movies/create" component={CreatePage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/movies/edit/:id" component={MoviesEditPage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/users/edit/details/:id" component={UsersEditDetailsPage} />
                        <AuthRoute auth={this.state.isAuthenticated} path="/users/edit/password/:id" component={UsersEditPasswordPage} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default withRouter(App)
