import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TVAddForm from "./TVAddForm";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getTVSel} from "../../../redux/reducers/tvs-selector";
import {createTV} from "../../../redux/reducers/tvs-reducer";
import {getShowsSel} from "../../../redux/reducers/show-selector";
import {getShows} from "../../../redux/reducers/show-reducer";


class TVAddContainer extends React.Component {

    componentDidMount() {
        this.props.getShows(1,1000);
    };

    onSubmit = (tv) => {
        this.props.createTV(tv);
    };

    render() {
        return (
            <TVAddForm
                onSubmit={this.onSubmit}
                shows={this.props.shows}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        tv: getTVSel(state),
        shows: getShowsSel(state)
    }
};


export default compose(
    connect(mapStateToProps, {createTV, getShows}),
    withRouter,
    withAuthRedirect
)(TVAddContainer);