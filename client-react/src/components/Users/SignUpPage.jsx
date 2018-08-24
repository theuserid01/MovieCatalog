import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import reqService from '../../services/requests'
import observer from '../../services/observer'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Submit',
    isFieldDisabled: false,
    isFieldsDetailsVisible: true,
    isFieldsPasswordsVisible: true,
    title: 'Register'
}

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: 'admin@gmail.com',
            password: 'Admin1',
            repeatPassword: 'Admin1',
            username: 'admin'
        }
    }

    onSubmitHandler = async (values, formikBag) => {
        const data = {
            email: values.email,
            password: values.password,
            repeatPassword: values.repeatPassword,
            username: values.username
        }

        try {
            const res = await reqService.signUp(data)

            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

            formikBag.resetForm()
            localStorage.setItem('user', JSON.stringify(res.data))
            observer.onLogin()
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

export default withRouter(RegisterPage)
