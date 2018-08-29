import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import moviesService from '../../services/movies-service'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    title: 'Create Movie'
}
const onSubmitHandler = (data) => moviesService.createPost(data)

const CreatePage = (props) => {
    const data = {
        countries: '',
        genres: '',
        imageUrl: '',
        languages: '',
        productionYear: 0,
        synopsis: '',
        title: ''
    }
    return (
        <MovieForm
            attr={attr}
            history={props.history}
            initValues={data}
            params={props.match.params}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default withRouter(CreatePage)
