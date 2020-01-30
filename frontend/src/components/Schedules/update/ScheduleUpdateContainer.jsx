import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {change, formValueSelector} from "redux-form";
import ScheduleUpdateForm from "./ScheduleUpdateForm";
import {getScheduleSel} from "../../../redux/reducers/schedule-selector";
import {getSchedule, putSchedule, setSchedule} from "../../../redux/reducers/schedule-reducer";
import {getShows} from "../../../redux/reducers/show-reducer";
import {getTVs} from "../../../redux/reducers/tvs-reducer";
import {getShowsSel} from "../../../redux/reducers/show-selector";
import {getTVsSel} from "../../../redux/reducers/tvs-selector";


class ScheduleUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getSchedule(this.props.match.params.id);
        this.props.getShows(1, 1000);
        this.props.getTVs(1,1000);
    };


    onSubmit = (schedule) => {
        this.props.putSchedule(this.props.match.params.id, {schedule});
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <ScheduleUpdateForm
                initialValues={this.props.schedule}
                url={this.props.match.params.id}
                onSubmit={this.onSubmit}
                isAuth = {this.props.isAuth}
                onClick={this.imgClick}
                formValues={this.props.formValues2}
                shows={this.props.shows}
                channels={this.props.tvs}
            />
        </>
    }
}

const selector = formValueSelector('scheduleUpdateForm');

let mapStateToProps = (state) => {
    return {
        schedule: getScheduleSel(state),
        formValues2: selector(state, 'shows'),
        shows: getShowsSel(state),
        tvs: getTVsSel(state)
    }
};

export default compose(
    connect(mapStateToProps, {setSchedule, putSchedule, getShows, getSchedule, getTVs, change}),
    withRouter,
    withAuthRedirect
)(ScheduleUpdateContainer);