import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import {email, required} from '../common/Validator/Validator';

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

let LoginForm = (props) => {

    const {handleSubmit, submitting} = props;

    if(props.isAuth){
        return <Redirect to={"/"} />
    }

    return (
        <section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Вход на сайт</h1>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label> Email address </Form.Label>
                                <Field name="email" component={renderField} type="text"  validate={[required, email]} warn={email}/>
                                <Form.Text className="text-muted">Если у вас нет этих данных, обратитесь к администратору</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Field name="password" component={renderField} type="password" validate={required}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={submitting}>Отправить</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default LoginForm = reduxForm({
    form: 'login', // a unique identifier for this form
    enableReinitialize : true
})(LoginForm)