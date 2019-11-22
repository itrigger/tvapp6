import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Login from "./Login";
import {goLogin} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";
import {loginSuccessRedirect} from "../../hoc/withAuthRedirect";


class LoginContainer extends React.Component {

    onSubmit = (email, password) => {
        this.props.goLogin(email, password);
    };

    render() {
        return (
            <Login onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        _id: state.authReducer._id,
        name: state.authReducer.name,
        email: state.authReducer.email,
        password: state.authReducer.password,
        isAuth: state.authReducer.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {goLogin}),
    withRouter,
    loginSuccessRedirect
)(LoginContainer);
