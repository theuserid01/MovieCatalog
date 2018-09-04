import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Pagination from '../shared/Pagination'
import usersService from '../../services/users-service'

class AllPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            users: [],
            usersPagination: {
                currentPage: 1,
                hasNextPage: false,
                hasPrevPage: false,
                nextPage: 0,
                prevPage: 0,
                search: '',
                queryPage: '',
                querySearch: '',
                totalPages: 0,
                totalPagesRange: []
            }
        }
    }

    componentDidMount() {
        this.getData()
        window.history.pushState(
            { page: 1 }, '', '/users/all?page=1'
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) {
            return
        }

        this.getData(nextProps.location.search)
    }

    async getData(query = this.props.location.search) {
        try {
            const res = await usersService.allGet(query)

            if (!res.success) {
                console.log(res.message)
                return
            }

            this.setState({
                search: res.data.usersPagination.search,
                users: res.data.users,
                usersPagination: res.data.usersPagination
            })
        } catch (err) {
            console.log(err)
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()

        const queryParams = this.state.search
            ? `?page=1&search=${this.state.search}`
            : '?page=1'
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: queryParams
        })
    }

    render() {
        return (
            <section>
                <h1 className="text-center">Users</h1>
                {this.state.users.length === 0 && (
                    <h3 className="text-center">No users</h3>
                )}
                {this.state.users.length > 0 && (
                    <article>
                        <form
                            className="col-4"
                            onSubmit={this.onSubmitHandler}
                        >
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        onChange={this.onChangeHandler}
                                        type="text"
                                        className="form-control"
                                        aria-describedby="basic-addon2"
                                        aria-label="Search by Email OR Username"
                                        name="search"
                                        placeholder="Search by Email OR Username"
                                        value={this.state.search}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <table className="container table table-bordered table-hover table-sm table-striped table-responsive">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(m => {
                                    return (
                                        <tr key={m._id}>
                                            <td className="fit">{m._id}</td>
                                            <td>{m.username}</td>
                                            <td>{m.email}</td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-xs d-flex">
                                                    <Link
                                                        to={'/users/edit/details/' + m._id}
                                                        className="btn btn-sm btn-info-b3 w-100"
                                                        role="button"
                                                    >Edit Details
                                                    </Link>
                                                    <Link
                                                        to={'/users/edit/roles/' + m._id}
                                                        className="btn btn-sm btn-warning-b3 w-100"
                                                        role="button"
                                                    >Edit Roles
                                                    </Link>
                                                    <Link
                                                        to={'/users/delete/' + m._id}
                                                        className="btn btn-sm btn-danger-b3 w-100"
                                                        role="button"
                                                    >Delete User
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            pagination={this.state.usersPagination}
                        />
                    </article>
                )}
            </section>
        )
    }
}

export default withRouter(AllPage)
