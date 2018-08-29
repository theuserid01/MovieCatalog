import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import withLoading from '../../helpers/withLoading'
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
            history={props.history}
            initValues={props.data}
            params={props.match.params}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default withRouter(
    withLoading(EditPage, getData, { id: true })
)
