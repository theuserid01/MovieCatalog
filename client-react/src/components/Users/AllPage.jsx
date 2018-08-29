import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Pagination from '../common/Pagination'
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) {
            return
        }

        this.getData(nextProps.location.search)
    }

    async getData(query = '?page=1') {
        try {
            const res = await usersService.allGet(query)

            if (!res.success) {
                console.log(res.message)
                return
            }

            this.setState({
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

    onSubmitHandler = async (e) => {
        e.preventDefault()

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: '?search=' + this.state.search
        })

        this.getData(this.props.location.search)
    }

    render() {
        return (
            <section>
                <h1 className="text-center">Users</h1>
                <form className="col-4" onSubmit={this.onSubmitHandler}>
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
                                <button type="submit" className="btn btn-primary">Search</button>
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
                                            <Link to={'/users/edit/details/' + m._id} className="btn btn-sm btn-info-b3 w-100" role="button">Edit Details</Link>
                                            <Link to={'/users/edit/roles/' + m._id} className="btn btn-sm btn-warning-b3 w-100" role="button">Edit Roles</Link>
                                            <Link to={'/users/delete/' + m._id} className="btn btn-sm btn-danger-b3 w-100" role="button">Delete User</Link>
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
            </section >
        )
    }
}

export default withRouter(AllPage)
