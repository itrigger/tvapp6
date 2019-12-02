import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import TVUpdateForm from "./TVUpdateForm";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getTVSel} from "../../../redux/reducers/tvs-selector";
import {getTV, putTV, setTV} from "../../../redux/reducers/tvs-reducer";



class TVUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getTV(this.props.match.params.id);
    };

    onSubmit = (tv) => {
        this.props.putTV(this.props.match.params.id, tv);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <TVUpdateForm initialValues={this.props.tv}
                             url={this.props.match.params.id}
                             onSubmit={this.onSubmit}
                             isAuth = {this.props.isAuth}
            />
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        tv: getTVSel(state)
    }
};

export default compose(
    connect(mapStateToProps, {setTV, putTV, getTV}),
    withRouter,
    withAuthRedirect
)(TVUpdateContainer);