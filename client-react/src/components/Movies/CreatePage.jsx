import React from 'react'
import { withRouter } from 'react-router-dom'

import MovieForm from './_MovieForm'
import reqService from '../../services/requests'

const attr = {
    btnColor: 'btn-outline-primary',
    btnText: 'Save',
    isFieldDisabled: false,
    title: 'Create Movie'
}

class CreatePage extends React.Component {
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

    onSubmitHandler = async (values, formikBag) => {
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
            const res = await reqService.movieCreatePost(data)
            if (!res.success) {
                console.log(res.message)
                formikBag.setErrors(res.errors)
                formikBag.setSubmitting(false)
                return
            }

            formikBag.resetForm()
            this.props.history.push('/')
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

export default withRouter(CreatePage)
