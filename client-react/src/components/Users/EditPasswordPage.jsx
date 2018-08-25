import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'

import FieldGroup from '../common/FieldGroup'
import usersService from '../../services/users-service'

const EditPasswordPage = (props) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                passwordCurrent: '',
                passwordNew: '',
                passwordRepeatNew: ''
            }}
            validationSchema={
                yup.object().shape({
                    passwordCurrent: yup.string()
                        .required('Password is required!'),
                    passwordNew: yup.string()
                        .required('Password is required!'),
                    passwordRepeatNew: yup.string()
                        .oneOf([yup.ref('passwordNew')], 'Passwords do not match!')
                        .required('Password is required!'),
                })
            }
            onSubmit={
                async (values, { resetForm, setErrors, setSubmitting }) => {
                    const formikBag = {
                        resetForm,
                        setErrors,
                        setSubmitting
                    }

                    const id = props.match.params.id
                    const data = {
                        passwordCurrent: values.passwordCurrent,
                        passwordNew: values.passwordNew,
                        passwordRepeatNew: values.passwordRepeatNew
                    }

                    try {
                        const res = await usersService
                            .editPasswordPost(id, data)

                        if (!res.success) {
                            console.log(res.message)
                            formikBag.setErrors(res.errors)
                            formikBag.setSubmitting(false)
                            return
                        }

                        formikBag.resetForm()
                        props.history.goBack()
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            render={({ isSubmitting, values }) =>
                <section className="d-flex flex-row justify-content-center">
                    <article className="col-4">
                        <h1 className="text-center">Edit Password</h1>
                        <FormikForm>
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='Current Password'
                                name='passwordCurrent'
                                placeholder='Enter current password'
                                required={false}
                                type='password'
                                value={values.passwordCurrent}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='New Password'
                                name='passwordNew'
                                placeholder='Enter new password'
                                required={false}
                                type='password'
                                value={values.passwordNew}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='Repeat New Password'
                                name='passwordRepeatNew'
                                placeholder='Repeat new password'
                                required={false}
                                type='password'
                                value={values.passwordRepeatNew}
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
                                    Save
                                </button>
                            </div>
                        </FormikForm>
                    </article>
                </section>
            }
        />
    )
}

export default withRouter(EditPasswordPage)
