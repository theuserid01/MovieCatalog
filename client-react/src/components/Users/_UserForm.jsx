import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import * as yup from 'yup'
import FieldGroup from '../common/FieldGroup'

const UserForm = ({ attr, history, initValues, onSubmit }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initValues}
            validationSchema={
                yup.object().shape({
                    email: yup.string()
                        .email('Invalid email!')
                        .required('Email is required!')
                        .trim(),
                    // password: yup.string()
                    //     .required('Password is required!'),
                    // repeatPassword: yup.string()
                    //     .oneOf([yup.ref('password')], 'Passwords do not match!')
                    //     .required('Password is required!'),
                    username: yup.string()
                        .required('Username is required!')
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
                            {attr.isFieldsDetailsVisible && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={attr.isFieldDisabled}
                                    label='Username'
                                    name='username'
                                    placeholder='Enter username'
                                    required={true}
                                    type='text'
                                    value={values.username}
                                />
                            )}
                            {attr.isFieldsDetailsVisible && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={attr.isFieldDisabled}
                                    label='Email'
                                    name='email'
                                    placeholder='Enter email'
                                    required={true}
                                    type='email'
                                    value={values.email}
                                />
                            )}
                            {attr.isFieldsPasswordsVisible && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={attr.isFieldDisabled}
                                    label='Password'
                                    name='password'
                                    placeholder='Enter password'
                                    required={true}
                                    type='password'
                                    value={values.password}
                                />
                            )}
                            {attr.isFieldsPasswordsVisible && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={attr.isFieldDisabled}
                                    label='Repeat Password'
                                    name='repeatPassword'
                                    placeholder='Repeat password'
                                    required={true}
                                    type='password'
                                    value={values.repeatPassword}
                                />
                            )}
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

export default UserForm
