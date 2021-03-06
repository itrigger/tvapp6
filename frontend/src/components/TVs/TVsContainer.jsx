import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import TVs from "./TVs";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

import {
    activeTVOff,
    activeTVOn, deleteTV, getTVs, putTVActive, reloadTV,
    setCurrentPage,
    setTotalTVsCount,
    setTVs,
    toggleIsFetching, toggleIsTVsUpdating
} from "../../redux/reducers/tvs-reducer";
import {
    getCurrentPageSel,
    getIsFetchingSel, getIsTVsUpdatingSel,
    getPageSizeSel,
    getTotalTVsCountSel,
    getTVsSel
} from "../../redux/reducers/tvs-selector";
import {getShowsSel} from "../../redux/reducers/show-selector";
import {getShows} from "../../redux/reducers/show-reducer";



class TVsContainer extends React.Component {

    componentDidMount() {
        this.props.getTVs(this.props.currentPage, this.props.pageSize);
        this.props.getShows(1,1000);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getTVs(pageNumber, this.props.pageSize);
    };

    deleteTVOnClick = (id) => {
        this.props.deleteTV(id);
    };
    reloadTVOnClick = (place, number, channel) => {
        this.props.reloadTV(place, number, channel);
    };


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <TVs
                totalSlidesCount={this.props.totalSlidesCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                tvs={this.props.tvs}
                activeOff={this.props.activeTVOff}
                activeOn={this.props.activeTVOn}
                isFetching = {this.props.isFetching}
                isTVsUpdating = {this.props.isTVsUpdating}
                toggleIsTVsUpdating = {this.props.toggleIsTVsUpdating}
                putTVActive = {this.props.putTVActive}
                deleteTV = {this.deleteTVOnClick}
                reloadTV = {this.reloadTVOnClick}
                showName = {this.props.showName}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        tvs: getTVsSel(state),
        pageSize: getPageSizeSel(state),
        totalSlidesCount: getTotalTVsCountSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        isTVsUpdating: getIsTVsUpdatingSel(state),
        showName: getShowsSel(state)
    }
};

/*Compose служит для комбинации всех оберток над компонентой*/
export default compose(
    connect(mapStateToProps, {activeTVOn, activeTVOff, deleteTV, getTVs, reloadTV, setTVs, setCurrentPage, setTotalTVsCount, toggleIsFetching, toggleIsTVsUpdating, putTVActive, getShows}),
    withRouter,
    withAuthRedirect
)(TVsContainer);