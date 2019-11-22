import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authReducer.isAuth
})

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render(){
            if (!this.props.isAuth) return <Redirect to={'/login'} />

            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;

};



export const loginSuccessRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render(){
            if (this.props.isAuth) return <Redirect to={'/'} />
            return <Component {...this.props} />
        }
    }

    let ConnectedloginSuccessRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedloginSuccessRedirect;

};