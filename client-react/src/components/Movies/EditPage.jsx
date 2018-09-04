import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import withLoader from '../../helpers/withLoader'
import moviesService from '../../services/movies-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    title: 'Edit Movie'
}
const getData = (id) => moviesService.editGet(id)
const onSubmitHandler = (id, data) => moviesService.editPost(id, data)

const EditPage = (props) => {
    return (
        <MovieForm
            attr={attr}
            initValues={props.data}
            onSubmitHandler={onSubmitHandler}
            {...props}
        />
    )
}

export default withRouter(
    withLoader(EditPage, getData, { id: true })
)
