import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Schedule from "./Schedules";
import {
    deleteSchedule,
    getSchedules,
    setCurrentPage,
    setTotalSchedulesCount, toggleIsFetching, toggleIsSchedulesUpdating
} from "../../redux/reducers/schedule-reducer";
import {
    getCurrentPageSel, getIsFetchingSel, getIsSchedulesUpdatingSel,
    getPageSizeSel,
    getSchedulesSelSorted,
    getTotalSchedulesCountSel
} from "../../redux/reducers/schedule-selector";



class SchedulesContainer extends React.Component {

    componentDidMount() {
        this.props.getSchedules(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getSchedules(pageNumber, this.props.pageSize);
    };

    deleteScheduleOnClick = (id) => {
        this.props.deleteSchedule(id);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Schedule
                totalSchedulesCount={this.props.totalSchedulesCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                schedules={this.props.schedules}
                isFetching = {this.props.isFetching}
                isSchedulesUpdating = {this.props.isSchedulesUpdating}
                toggleIsSchedulesUpdating = {this.props.toggleIsSchedulesUpdating}
                deleteSchedule = {this.deleteScheduleOnClick}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        schedules: getSchedulesSelSorted(state),
        pageSize: getPageSizeSel(state),
        totalSchedulesCount: getTotalSchedulesCountSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        isSchedulesUpdating: getIsSchedulesUpdatingSel(state)
    }
};

/*Compose служит для комбинации всех оберток над компонентой*/
export default compose(
    connect(mapStateToProps, {getSchedules, deleteSchedule, setCurrentPage, setTotalSchedulesCount, toggleIsFetching, toggleIsSchedulesUpdating}),
    withRouter,
    withAuthRedirect
)(SchedulesContainer);