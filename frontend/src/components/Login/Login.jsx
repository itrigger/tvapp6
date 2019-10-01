import React from 'react'
import { Field, reduxForm } from 'redux-form'
import store from '../../redux/redux-store';

let LoginForm = (props) => {

    return (<form onSubmit={props.handleSubmit}>
        <div>
            <label htmlFor="login">Login</label>
            <Field name="login" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Submit</button>
    </form>)
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) =>{
    const onSubmit = (formData) =>{
        console.log(formData);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit()}/>
    </div>
}


export default Login;