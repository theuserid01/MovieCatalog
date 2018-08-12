import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import reqService from '../../services/requests'

const attr = {
    btnColor: 'btn-outline-danger',
    btnText: 'Delete',
    isFieldDisabled: true,
    isFieldsDetailsVisible: true,
    isFieldsPasswordsVisible: false,
    title: 'Delete User'
}

class DeletePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            username: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        try {
            const id = this.props.match.params.id
            const res = await reqService.userEditDetailsGet(id)

            if (!res.success) {
                console.log(res.message)
                return
            }

            this.setState(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    onSubmitHandler = async (values, formikBag) => {
        const id = this.props.match.params.id
        const data = {
            email: values.email,
            username: values.username
        }

        try {
            const res = await reqService.userDeletePost(id, data)

            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

            formikBag.resetForm()
            this.props.history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <UserForm
                attr={attr}
                history={this.props.history}
                initValues={this.state}
                onSubmit={this.onSubmitHandler}
            />
        )
    }
}

export default withRouter(DeletePage)
