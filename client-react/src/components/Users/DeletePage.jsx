import React from 'react'
import { withRouter } from 'react-router-dom'

import UserForm from './_UserForm'
import withLoader from '../../helpers/withLoader'
import usersService from '../../services/users-service'

const attr = {
    btnColor: 'btn-outline-danger',
    btnText: 'Delete',
    isFieldDisabled: true,
    isFieldVisibleEmail: true,
    isFieldVisiblePassword: false,
    isFieldVisiblePasswordCurrent: false,
    isFieldVisiblePasswordNew: false,
    isFieldVisiblePasswordRepeat: false,
    isFieldVisiblePasswordRepeatNew: false,
    isFieldVisibleUsername: true,
    title: 'Delete User'
}
const formModel = {
    email: '',
    username: ''
}
const getData = (id) => usersService.deleteGet(id)
const onSubmitHandler = (id, data) => usersService.deletePost(id, data)

const DeletePage = (props) => {
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
    withLoader(DeletePage, getData, { id: true })
)
