import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import withLoading from '../../helpers/withLoading'
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
            history={props.history}
            initValues={props.data}
            params={props.match.params}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default withRouter(
    withLoading(DeletePage, getData, { id: true })
)
