import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import reqService from '../../services/requests'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    title: 'Edit Movie'
}

class EditPage extends React.Component {
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
        const id = this.props.match.params.id

        try {
            const res = await reqService.movieEditGet(id)

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
            const res = await reqService.movieEditPost(id, data)

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

export default withRouter(EditPage)
