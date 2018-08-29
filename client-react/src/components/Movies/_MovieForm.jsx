import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import * as yup from 'yup'

import FieldGroup from '../common/FieldGroup'

const MovieForm = ({ attr, history, initValues, onSubmit }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initValues}
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
                (values, { resetForm, setErrors, setSubmitting }) => {
                    const formikBag = {
                        resetForm,
                        setErrors,
                        setSubmitting
                    }
                    onSubmit(values, formikBag)
                }
            }
            render={({ isSubmitting, values }) =>
                <section className="d-flex flex-row justify-content-center">
                    <article className="col-4">
                        <h1 className="text-center">{attr.title}</h1>
                        <FormikForm>
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
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
                                disabled={attr.isFieldDisabled}
                                label='Synopsis'
                                name='synopsis'
                                placeholder='Enter synopsis'
                                rows='5'
                                required={false}
                                type='text'
                                value={values.synopsis}
                            />
                            <div className="btn-group d-flex" role="group">
                                <button
                                    onClick={history.goBack}
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={'btn ' + attr.btnColor + ' w-100'}
                                    disabled={isSubmitting}
                                >
                                    {attr.btnText}
                                </button>
                            </div>
                        </FormikForm>
                    </article>
                </section>
            }
        />
    )
}

export default MovieForm
