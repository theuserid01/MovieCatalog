import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'

import FieldGroup from '../Common/FieldGroup'
import reqService from '../../services/requests'

const EditPasswordPage = (props) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                currentPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            }}
            validationSchema={
                yup.object().shape({
                    currentPassword: yup.string()
                        .required('Password is required!'),
                    newPassword: yup.string()
                        .required('Password is required!'),
                    repeatNewPassword: yup.string()
                        .oneOf([yup.ref('newPassword')], 'Passwords do not match!')
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
                        currentPassword: values.currentPassword,
                        newPassword: values.newPassword,
                        repeatNewPassword: values.repeatNewPassword
                    }

                    try {
                        const res = await reqService
                            .userEditPasswordPost(id, data)

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
                                name='currentPassword'
                                placeholder='Enter current password'
                                required={false}
                                type='password'
                                value={values.currentPassword}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='New Password'
                                name='newPassword'
                                placeholder='Enter new password'
                                required={false}
                                type='password'
                                value={values.newPassword}
                            />
                            <FormikField
                                colWidth='col-12'
                                component={FieldGroup}
                                componentType='input'
                                disabled={false}
                                label='Repeat New Password'
                                name='repeatNewPassword'
                                placeholder='Repeat new password'
                                required={false}
                                type='password'
                                value={values.repeatNewPassword}
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
