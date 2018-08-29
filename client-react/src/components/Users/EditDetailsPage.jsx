import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import withLoading from '../../helpers/withLoading'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    isFieldsDetailsVisible: true,
    isFieldsPasswordsVisible: false,
    title: 'Edit Details'
}

class EditDetailsPage extends React.Component {

    onSubmitHandler = async (values, formikBag) => {
        const id = this.props.match.params.id
        const data = {
            email: values.email,
            username: values.username
        }

        try {
            const res = await usersService.editDetailsPost(id, data)

            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

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
                initValues={this.props.data}
                onSubmit={this.onSubmitHandler}
            />
        )
    }
}

const request = (id) => usersService.editDetailsGet(id)
export default withRouter(
    withLoading(EditDetailsPage, request, { id: true })
)
