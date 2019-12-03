import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TVAddForm from "./TVAddForm";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getTVSel} from "../../../redux/reducers/tvs-selector";
import {createTV} from "../../../redux/reducers/tvs-reducer";


class TVAddContainer extends React.Component {

    onSubmit = (tv) => {
        this.props.createTV(tv);
    };

    render() {
        return (
            <TVAddForm onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        tv: getTVSel(state)
    }
};


export default compose(
    connect(mapStateToProps, {createTV}),
    withRouter,
    withAuthRedirect
)(TVAddContainer);