import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        const { user, onLogout } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">App</Link>
                    <button
                        type="button"
                        className="navbar-toggler navbar-toggler-right"
                        aria-controls=".navbar-collapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        data-target=".navbar-collapse"
                        data-toggle="collapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <Link to="/" className="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" role="button">Movies</Link>
                                <div className="dropdown-menu">
                                    <Link to="/" className="dropdown-item">All Movies</Link>
                                    <Link to="/movies/create" className="dropdown-item">Create Movie</Link>
                                </div>
                            </li>
                        </ul>
                        {user.isAuthenticated && (
                            <ul className="navbar-nav" id="navbarSupportedContent">
                                {user.isAdmin && (
                                    <li className="nav-item dropdown">
                                        <Link to="/" className="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" role="button">Admin</Link>
                                        <div className="dropdown-menu">
                                            <Link to="/admin/users/all" className="dropdown-item">All Users</Link>
                                        </div>
                                    </li>
                                )}
                                <li className="nav-item dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" role="button">My Profile</Link>
                                    <div className="dropdown-menu">
                                        <Link to={'/users/edit/details/' + user._id} className="dropdown-item">Edit Details</Link>
                                        <Link to={'/users/edit/password/' + user._id} className="dropdown-item">Edit Password</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={onLogout}>Logout</Link>
                                </li>
                            </ul>
                        )}
                        {!user.isAuthenticated && (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/users/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/users/register" className="nav-link">Register</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        )
    }
}
