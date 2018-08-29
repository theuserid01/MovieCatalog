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

class DeletePage extends React.Component {

    onSubmitHandler = async (values, formikBag) => {
        const id = this.props.match.params.id
        const data = {
            countries: values.countries,
            genres: values.genres,
            imageUrl: values.imageUrl,
            languages: values.languages,
            productionYear: Number(values.productionYear),
            synopsis: values.synopsis,
            title: values.title
        }

        try {
            const res = await moviesService.deletePost(id, data)

            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

            this.props.history.push('/movies/all')
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <MovieForm
                attr={attr}
                history={this.props.history}
                initValues={this.props.data}
                onSubmit={this.onSubmitHandler}
            />
        )
    }
}

const request = (id) => moviesService.deleteGet(id)
export default withRouter(
    withLoading(DeletePage, request, { id: true })
)
