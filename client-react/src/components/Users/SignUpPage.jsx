import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Submit',
    isFieldDisabled: false,
    isFieldsDetailsVisible: true,
    isFieldsPasswordsVisible: true,
    title: 'Register'
}

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: 'admin@gmail.com',
            password: 'Admin1',
            passwordRepeat: 'Admin1',
            username: 'admin'
        }
    }

    onSubmitHandler = async (values, formikBag) => {
        const data = {
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            username: values.username
        }

        try {
            const res = await usersService.signUp(data)

            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

            this.props.history.push('/')
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

export default withRouter(SignUp)
