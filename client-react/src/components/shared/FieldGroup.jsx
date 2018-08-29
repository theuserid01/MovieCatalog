import React from 'react'

const Input = (props) => {
    const Tag = props.componentType
    const field = props.field
    const form = props.form
    const name = field.name
    let error = form.errors[name]
    let touched = form.touched[name]
    const classNameInput =
        !(touched && error)
            ? 'form-control'
            : 'form-control is-invalid'
    return (
        <div className={props.colWidth + ' form-group p-0'}>
            <label
                className="form-control-label"
                htmlFor={name}
            >
                {props.label}
            </label>
            <Tag
                {...field}
                type={props.type}
                className={classNameInput}
                id={name}
                name={name}
                placeholder={props.placeholder}
                rows={props.rows}
                {...(props.min && { min: props.min })}
                {...(props.max && { max: props.max })}
                {...(props.step && { step: props.step })}
                {...(props.rows && { rows: props.rows })}
                value={field.value}
                disabled={props.disabled}
                required={props.required}
            />
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}

export default Input
