import React from 'react';

export const renderField = ({
                         input,
                         label,
                         type,
                         placeholder,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={(placeholder == null) ? label : placeholder} type={type} className="form-control"/>
            {touched &&
            ((error && <span className="invalid-feedback">{error}</span>) ||
                (warning && <span className="invalid-feedback">{warning}</span>))}
        </div>
    </div>
);


export const required = value => (value || typeof value === 'number' ? undefined : 'Обязательное поле');

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный формат почты' : undefined;
