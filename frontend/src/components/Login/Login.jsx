import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

let LoginForm = (props) => {

    const {handleSubmit} = props;

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
                                <Field name="email" component="input" type="text" className="form-control"/>
                                <Form.Text className="text-muted">Если у вас нет этих данных, обратитесь к администратору</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Field name="password" component="input" type="password" className="form-control"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">Отправить</Button>
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