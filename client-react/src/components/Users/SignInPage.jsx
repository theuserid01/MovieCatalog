import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Submit',
    isFieldDisabled: false,
    isFieldVisibleEmail: false,
    isFieldVisiblePassword: true,
    isFieldVisiblePasswordCurrent: false,
    isFieldVisiblePasswordNew: false,
    isFieldVisiblePasswordRepeat: false,
    isFieldVisiblePasswordRepeatNew: false,
    isFieldVisibleUsername: true,
    title: 'Login'
}
const formModel = {
    password: 'Admin1',
    username: 'admin'
}
const onSubmitHandler = (data) => usersService.signIn(data)

const SignInPage = (props) => {
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

export default withRouter(SignInPage)
