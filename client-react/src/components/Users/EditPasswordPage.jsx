import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    isFieldVisibleEmail: false,
    isFieldVisiblePassword: false,
    isFieldVisiblePasswordCurrent: true,
    isFieldVisiblePasswordNew: true,
    isFieldVisiblePasswordRepeat: false,
    isFieldVisiblePasswordRepeatNew: true,
    isFieldVisibleUsername: false,
    title: 'Edit Password'
}
const formModel = {
    passwordCurrent: '',
    passwordNew: '',
    passwordRepeatNew: ''
}
const onSubmitHandler = (id, data) => usersService.editPasswordPost(id, data)

const EditPasswordPage = (props) => {
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

export default withRouter(EditPasswordPage)
