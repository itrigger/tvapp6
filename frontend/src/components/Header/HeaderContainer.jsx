import React from 'react';
import Header from "./Header";
import * as axios from "axios";
import {connect} from 'react-redux';
import {setUserDataAC} from "../../redux/reducers/auth-reducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        axios.get(`http://localhost:3012/api/me`, {withCredentials: true})
            .then(res => {

                if (res.data.resultCode === 0) {
                    let {_id, name, email, password} = res.data.user;
                    this.props.setUserDataAC(_id, name, email, password);
                }
            })
    }

    render() {
        return <Header {...this.props}/>

    }
}

let mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth,
    name: state.authReducer.name,
    email: state.authReducer.email
});

export default connect(mapStateToProps, {setUserDataAC})(HeaderContainer);