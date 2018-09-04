import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Submit',
    isFieldDisabled: false,
    isFieldVisibleEmail: true,
    isFieldVisiblePassword: true,
    isFieldVisiblePasswordCurrent: false,
    isFieldVisiblePasswordNew: false,
    isFieldVisiblePasswordRepeat: true,
    isFieldVisiblePasswordRepeatNew: false,
    isFieldVisibleUsername: true,
    title: 'Register'
}
const formModel = {
    email: 'admin@gmail.com',
    password: 'Admin1',
    passwordRepeat: 'Admin1',
    username: 'admin'
}
const onSubmitHandler = (data) => usersService.signUp(data)

const SignUpPage = (props) => {
    return (
        <UserForm
            attr={attr}
            formModel={formModel}
            initValues={formModel}
            onSubmitHandler={onSubmitHandler}
            {...props}
        />
    )
}

export default withRouter(SignUpPage)
