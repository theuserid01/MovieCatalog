import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import withLoader from '../../helpers/withLoader'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    isFieldVisibleEmail: true,
    isFieldVisiblePassword: false,
    isFieldVisiblePasswordCurrent: false,
    isFieldVisiblePasswordNew: false,
    isFieldVisiblePasswordRepeat: false,
    isFieldVisiblePasswordRepeatNew: false,
    isFieldVisibleUsername: true,
    title: 'Edit Details'
}
const formModel = {
    email: '',
    username: ''
}
const getData = (id) => usersService.editDetailsGet(id)
const onSubmitHandler = (id, data) => usersService.editDetailsPost(id, data)

const EditDetailsPage = (props) => {
    return (
        <UserForm
            attr={attr}
            formModel={formModel}
            initValues={props.data}
            onSubmitHandler={onSubmitHandler}
            {...props}
        />
    )
}

export default withRouter(
    withLoader(EditDetailsPage, getData, { id: true })
)
