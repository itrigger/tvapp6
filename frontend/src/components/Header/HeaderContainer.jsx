import React from 'react';
import {connect} from 'react-redux';
import {setUserDataAC} from "../../redux/reducers/auth-reducer";
import HeaderAuthTrue from "./HeaderAuthTrue";
import HeaderAuthFalse from "./HeaderAuthFalse";

class HeaderContainer extends React.Component {

    render() {

        if(this.props.isAuth){
            return <HeaderAuthTrue {...this.props}/>
        } else {
            return <HeaderAuthFalse {...this.props}/>
        }

    }
}

let mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth,
    name: state.authReducer.name,
    email: state.authReducer.email
});

export default connect(mapStateToProps, {setUserDataAC})(HeaderContainer);