import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import {email, renderField, required} from '../common/Validator/Validator';



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
                                <Field name="email" component={renderField} type="text" label={"Ваш email"} validate={[required, email]}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Field name="password" component={renderField} label={"Пароль"} type="password" validate={required}/>
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