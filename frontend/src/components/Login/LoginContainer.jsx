import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Login from "./Login";
import {setUserDataAC} from "../../redux/reducers/auth-reducer";


class LoginContainer extends React.Component {

    onSubmit = (slide) => {
        this.props.createSlide({slide});
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
        password: state.authReducer.password
    }
};


let WithUrlDataContainerComponent = withRouter(LoginContainer);

export default connect(mapStateToProps, {setUserDataAC})(WithUrlDataContainerComponent);