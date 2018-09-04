import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import withLoader from '../../helpers/withLoader'
import moviesService from '../../services/movies-service'

const attr = {
    btnColor: 'btn-outline-danger',
    btnText: 'Delete',
    isFieldDisabled: true,
    title: 'Delete Movie'
}
const getData = (id) => moviesService.deleteGet(id)
const onSubmitHandler = (id, data) => moviesService.deletePost(id, data)

const DeletePage = (props) => {
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
    withLoader(DeletePage, getData, { id: true })
)
