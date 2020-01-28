import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getShows} from "../../../redux/reducers/show-reducer";
import ScheduleAddForm from "./ScheduleAddForm";
import {createSchedule} from "../../../redux/reducers/schedule-reducer";
import {getShowsSel} from "../../../redux/reducers/show-selector";
import {getTVsSel} from "../../../redux/reducers/tvs-selector";
import {getTVs} from "../../../redux/reducers/tvs-reducer";

class ScheduleAddContainer extends React.Component {

    componentDidMount() {
       this.props.getShows(1, 1000);
       this.props.getTVs(1,1000);
    };



    onSubmit = (schedule) => {
        this.props.createSchedule({schedule});
    };

    render() {
        return (
            <ScheduleAddForm
                shows={this.props.shows}
                channels={this.props.tvs}
                onSubmit={this.onSubmit}
            />
        )
    }

}


let mapStateToProps = (state) => {
    return {
        shows: getShowsSel(state),
        tvs: getTVsSel(state)
    }
};

const mapDispatchToProps = {
    createSchedule,
    getShows,
    getTVs
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ScheduleAddContainer);