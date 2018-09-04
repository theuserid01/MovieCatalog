import React from 'react'
import { withRouter } from 'react-router-dom'

import usersService from '../../services/users-service'

class EDitRolesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            allRoles: [],
            availableRoles: [],
            currentRoles: [],
            selectedRoles: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        try {
            const id = this.props.match.params.id
            let res = await usersService.editRolesGet(id)

            if (!res.success) {
                console.log(res.message)
                return
            }

            const userRoles = res.data
            this.setState(userRoles)
        } catch (err) {
            console.log(err)
        }
    }

    onClickAllToLeft = () => {
        this.setState({
            error: false,
            availableRoles: this.state.allRoles,
            selectedRoles: []
        })
    }

    onClickAllToRight = () => {
        this.setState({
            error: false,
            availableRoles: [],
            selectedRoles: this.state.allRoles
        })
    }

    onClickSelectedToLeft = () => {
        const e = document.getElementById('selectedRoles')
        const selectedOption = e['options'][e['selectedIndex']]
        if (selectedOption === undefined) {
            this.setState({ error: true })
            return
        }

        let roleToMove = selectedOption.value

        this.setState(prevState => ({
            availableRoles: [
                ...prevState.availableRoles, roleToMove
            ].sort()
        }))

        this.setState(prevState => ({
            selectedRoles: [
                ...prevState
                    .selectedRoles
                    .filter(r => r !== roleToMove)
            ]
        }))
    }

    onClickSelectedToRight = () => {
        const e = document.getElementById('availableRoles')
        const selectedOption = e['options'][e['selectedIndex']]
        if (selectedOption === undefined) {
            this.setState({ error: true })
            return
        }

        let roleToMove = selectedOption.value

        this.setState(prevState => ({
            availableRoles: [
                ...prevState
                    .availableRoles
                    .filter(r => r !== roleToMove)
            ]
        }))

        this.setState(prevState => ({
            selectedRoles: [
                ...prevState.selectedRoles, roleToMove
            ].sort()
        }))
    }

    onChangeHandler = (e) => {
        this.setState({ error: false })
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const id = this.props.match.params.id
            const data = { roles: this.state.selectedRoles }
            const res = await usersService
                .editRolesPost(id, data)

            if (!res.success) {
                console.log(res.message)
                return
            }

            this.props.history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        let currentRoles = this.state.currentRoles
        return (
            <section className="align-items-center d-flex flex-column">
                <h1 className="text-center">Edit User Roles</h1>
                <article className=" col-6">
                    <form onSubmit={this.onSubmitHandler}>
                        <h5>Current roles: {
                            currentRoles.length > 0
                                ? currentRoles.join(', ')
                                : 'None'
                        }
                        </h5>
                        <div className="form-row mt-4">
                            <div className="form-group col-5">
                                <select
                                    onChange={this.onChangeHandler}
                                    className="form-control form-control-sm h-100"
                                    id="availableRoles"
                                    multiple
                                >
                                    {this.state.availableRoles.map(role => {
                                        return (
                                            <option
                                                key={role}
                                                value={role}
                                            >{role}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-2">
                                <div className="text-center">
                                    <div
                                        className="btn-group-vertical btn-group-xs"
                                        role="group"
                                    >
                                        <input
                                            onClick={this.onClickAllToRight}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            value=">>"
                                            {...this.state.availableRoles.length === 0 && { disabled: true }}
                                        />
                                        <input
                                            onClick={this.onClickSelectedToRight}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            value=">"
                                            {...this.state.availableRoles.length === 0 && { disabled: true }}
                                        />
                                        <input
                                            onClick={this.onClickSelectedToLeft}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            value="<"
                                            {...this.state.selectedRoles.length === 0 && { disabled: true }}
                                        />
                                        <input
                                            onClick={this.onClickAllToLeft}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            value="<<"
                                            {...this.state.selectedRoles.length === 0 && { disabled: true }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-5">
                                <select
                                    onChange={this.onChangeHandler}
                                    className="form-control form-control-sm h-100"
                                    id="selectedRoles"
                                    multiple
                                >
                                    {this.state.selectedRoles.map(role => {
                                        return (
                                            <option
                                                key={role}
                                                value={role}
                                            >{role}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group form-row">
                            <div className="form-group col-12 d-flex flex-column">
                                {this.state.error && <p className="text-danger">You must select a role!</p>}
                                <small>* Use the arrows to add or remove roles.</small>
                                <small>* The selected roles in the right form will be saved and overwrite the current ones.</small>
                            </div>
                        </div>
                        <div
                            className="btn-group d-flex"
                            role="group"
                        >
                            <button
                                type="button"
                                onClick={this.props.history.goBack}
                                className="btn btn-outline-secondary w-100"
                            >Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-outline-primary w-100"
                                id="save-roles"
                            >Save
                            </button>
                        </div>
                    </form>
                </article>
            </section>
        )
    }
}

export default withRouter(EDitRolesPage)
