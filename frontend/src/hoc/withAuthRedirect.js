import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getMe} from "../redux/reducers/auth-reducer";
import setAuthToken from "../context/AuthContext";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authReducer.isAuth
})

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {

        render(){
            const storedData = JSON.parse(localStorage.getItem('userData'));
            if (storedData && storedData.token) {
                console.log('has stored token');
                setAuthToken(storedData.token);
                getMe();
                return <Component {...this.props} />
            } else {
                return <Redirect to={'/login'} />
            }

        }
    }

    console.log('withAuthRedirect');
    return connect(mapStateToPropsForRedirect)(RedirectComponent);

};



export const loginSuccessRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render(){
            if (this.props.isAuth) return <Redirect to={'/'} />
            return <Component {...this.props} />
        }
    }


    return connect(mapStateToPropsForRedirect)(RedirectComponent);

};