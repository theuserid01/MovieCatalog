import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'

import FieldGroup from '../common/FieldGroup'
import usersService from '../../services/users-service'

const LoginPage = (props) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                username: 'admin',
                password: 'Admin1'
            }}
            validationSchema={
                yup.object().shape({
                    password: yup.string()
                        .required('Password is required!'),
                    username: yup.string()
                        .required('Username is required!')
                        .trim()
                })
            }
            onSubmit={
                async (values, { resetForm, setErrors, setSubmitting }) => {
                    const formikBag = {
                        resetForm,
                        setErrors,
                        setSubmitting
                    }

                    const data = {
                        password: values.password,
                        username: values.username
                    }

                    try {
                        const res = await usersService.signIn(data)

                        if (!res.success) {
                            console.log(res.message)
                            formikBag.setErrors(res.errors)
                            formikBag.setSubmitting(false)
                            return
                        }

                        props.history.push('/')
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            render={({ isSubmitting, values }) =>
                <section className="d-flex flex-row justify-content-center">
                    <article className="col-4">
                        <h1 className="text-center">Log in</h1>
                        <FormikForm>
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='Username'
                                name='username'
                                placeholder='Enter username'
                                required={true}
                                type='text'
                                value={values.username}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='Password'
                                name='password'
                                placeholder='Enter password'
                                required={false}
                                type='password'
                                value={values.password}
                            />
                            <div className="btn-group d-flex" role="group">
                                <button
                                    onClick={props.history.goBack}
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary w-100"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </FormikForm>
                    </article>
                </section>
            }
        />
    )
}

export default withRouter(LoginPage)
