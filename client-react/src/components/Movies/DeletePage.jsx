import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import moviesService from '../../services/movies-service'

const attr = {
    btnColor: 'btn-outline-danger',
    btnText: 'Delete',
    isFieldDisabled: true,
    title: 'Delete Movie'
}

class DeletePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: {
                countries: '',
                genres: '',
                imageUrl: '',
                languages: '',
                productionYear: 0,
                synopsis: '',
                title: ''
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        try {
            const id = this.props.match.params.id
            const res = await moviesService.deleteGet(id)

            if (!res.success) {
                console.log(res.message)
                this.props.history.push('/users/login')
                return
            }

            this.setState({ movie: res.data })
        } catch (err) {
            console.log(err)
        }
    }

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

            formikBag.resetForm()
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
                initValues={this.state.movie}
                onSubmit={this.onSubmitHandler}
            />
        )
    }
}

export default withRouter(DeletePage)
