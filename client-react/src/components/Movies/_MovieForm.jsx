import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import * as yup from 'yup'

import FieldGroup from '../shared/FieldGroup'

const MovieForm = (props) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={props.initValues}
            validationSchema={
                yup.object().shape({
                    imageUrl: yup.string()
                        .trim()
                        .url('Invalid url!'),
                    productionYear: yup.number()
                        .integer()
                        .min(1900, 'Production year must be min 1900')
                        .required('Production year is required!'),
                    title: yup.string()
                        .required('Title is required!')
                        .trim()
                })
            }
            onSubmit={
                async (values, { setErrors, setSubmitting }) => {
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
                        const id = props.match.params.id
                        let res = null
                        if (!id) {
                            res = await props.onSubmitHandler(data)
                        } else {
                            res = await props.onSubmitHandler(id, data)
                        }

                        if (!res.success) {
                            console.log(res.message)
                            setErrors(res.errors)
                            setSubmitting(false)
                            return
                        }

                        props.history.push('/movies/all')
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            render={({ isSubmitting, values }) => (
                <section className="d-flex flex-row justify-content-center">
                    <article className="col-4">
                        <h1 className="text-center">{props.attr.title}</h1>
                        <FormikForm>
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Title'
                                name='title'
                                placeholder='Enter title'
                                required={false}
                                type='text'
                                value={values.title}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Production Year'
                                name='productionYear'
                                placeholder='Enter production year'
                                required={false}
                                type='number'
                                value={values.productionYear}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Countries'
                                name='countries'
                                placeholder='Enter countries'
                                required={false}
                                type='text'
                                value={values.countries}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Genres'
                                name='genres'
                                placeholder='Enter genres'
                                required={false}
                                type='text'
                                value={values.genres}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Languages'
                                name='languages'
                                placeholder='Enter languages'
                                required={false}
                                type='text'
                                value={values.languages}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={props.attr.isFieldDisabled}
                                label='Image Url'
                                name='imageUrl'
                                placeholder='Enter image url'
                                required={false}
                                type='text'
                                value={values.imageUrl}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='textarea'
                                disabled={props.attr.isFieldDisabled}
                                label='Synopsis'
                                name='synopsis'
                                placeholder='Enter synopsis'
                                rows='5'
                                required={false}
                                type='text'
                                value={values.synopsis}
                            />
                            <div
                                className="btn-group d-flex"
                                role="group"
                            >
                                <button
                                    onClick={props.history.goBack}
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                >Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={'btn ' + props.attr.btnColor + ' w-100'}
                                    disabled={isSubmitting}
                                >{props.attr.btnText}
                                </button>
                            </div>
                        </FormikForm>
                    </article>
                </section>
            )}
        />
    )
}

export default MovieForm
