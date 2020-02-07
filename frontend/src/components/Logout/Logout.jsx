import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {goLogout} from "../../redux/reducers/auth-reducer";
import {compose} from "redux";


class Logout extends React.Component {

    componentDidMount() {
        this.props.goLogout();
    };

    render() {
        return (
           <>
           <Redirect to={'/login'} />
           </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {goLogout})
)(Logout);
