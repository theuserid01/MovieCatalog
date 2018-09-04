import React from 'react'
import { Formik, Field as FormikField, Form as FormikForm } from 'formik'
import * as yup from 'yup'

import FieldGroup from '../shared/FieldGroup'

const yupProps = {
    email: yup.string()
        .email('Invalid email!')
        .required('Email is required!')
        .trim(),
    password: yup.string()
        .required('Password is required!'),
    passwordCurrent: yup.string()
        .required('Password is required!'),
    passwordNew: yup.string()
        .required('Password is required!'),
    passwordRepeat: yup.string()
        .oneOf([yup.ref('password')], 'Passwords do not match!')
        .required('Password is required!'),
    passwordRepeatNew: yup.string()
        .oneOf([yup.ref('passwordNew')], 'Passwords do not match!')
        .required('Password is required!'),
    username: yup.string()
        .required('Username is required!')
        .trim()
}

const UserFormTemp = (props) => {
    const yupSchema = {}
    // Configure yup schema based on fomModel keys
    Object.keys(props.formModel).forEach((key) => {
        yupSchema[key] = yupProps[key]
    })

    return (
        <Formik
            enableReinitialize={true}
            initialValues={props.initValues}
            validationSchema={yup.object().shape(yupSchema)}
            onSubmit={
                async (values, { setErrors, setSubmitting }) => {
                    const data = {}
                    Object.keys(props.formModel).forEach((key) => {
                        data[key] = values[key]
                    })

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

                        props.history.goBack()
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
                            {props.attr.isFieldVisibleUsername && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Username'
                                    name='username'
                                    placeholder='Enter username'
                                    required={true}
                                    type='text'
                                    value={values.username}
                                />
                            )}
                            {props.attr.isFieldVisibleEmail && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Email'
                                    name='email'
                                    placeholder='Enter email'
                                    required={true}
                                    type='email'
                                    value={values.email}
                                />
                            )}
                            {props.attr.isFieldVisiblePassword && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Password'
                                    name='password'
                                    placeholder='Enter password'
                                    required={true}
                                    type='password'
                                    value={values.password}
                                />
                            )}
                            {props.attr.isFieldVisiblePasswordCurrent && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Current Password'
                                    name='passwordCurrent'
                                    placeholder='Enter current password'
                                    required={true}
                                    type='password'
                                    value={values.passwordCurrent}
                                />
                            )}
                            {props.attr.isFieldVisiblePasswordNew && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='New Password'
                                    name='passwordNew'
                                    placeholder='Enter new password'
                                    required={true}
                                    type='password'
                                    value={values.passwordNew}
                                />
                            )}
                            {props.attr.isFieldVisiblePasswordRepeat && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Repeat Password'
                                    name='passwordRepeat'
                                    placeholder='Repeat password'
                                    required={true}
                                    type='password'
                                    value={values.passwordRepeat}
                                />
                            )}
                            {props.attr.isFieldVisiblePasswordRepeatNew && (
                                <FormikField
                                    colWidth='col-12'
                                    component={FieldGroup}
                                    componentType='input'
                                    disabled={props.attr.isFieldDisabled}
                                    label='Repeat New Password'
                                    name='passwordRepeatNew'
                                    placeholder='Repeat new password'
                                    required={true}
                                    type='password'
                                    value={values.passwordRepeatNew}
                                />
                            )}
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

export default UserFormTemp
