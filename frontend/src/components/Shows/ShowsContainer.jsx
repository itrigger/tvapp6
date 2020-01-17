import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Shows from "./Shows";
import {
    deleteShow,
    getShows,
    setCurrentPage,
    setTotalShowsCount, toggleIsFetching, toggleIsShowsUpdating
} from "../../redux/reducers/show-reducer";
import {
    getCurrentPageSel, getIsFetchingSel, getIsShowsUpdatingSel,
    getPageSizeSel,
    getShowsSelSorted,
    getTotalShowsCountSel
} from "../../redux/reducers/show-selector";
import {getSlides} from "../../redux/reducers/slide-reducer";
import {getSlidesSortedSel} from "../../redux/reducers/slide-selector";


class ShowsContainer extends React.Component {

    componentDidMount() {
        this.props.getShows(this.props.currentPage, this.props.pageSize);
        this.props.getSlides(1,1000);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getShows(pageNumber, this.props.pageSize);
    };

    deleteShowOnClick = (id) => {
        this.props.deleteShow(id);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Shows
                totalShowsCount={this.props.totalShowsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                shows={this.props.shows}
                isFetching = {this.props.isFetching}
                isShowsUpdating = {this.props.isShowsUpdating}
                toggleIsShowsUpdating = {this.props.toggleIsShowsUpdating}
                deleteShow = {this.deleteShowOnClick}
                slides={this.props.slides}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        shows: getShowsSelSorted(state),
        pageSize: getPageSizeSel(state),
        totalShowsCount: getTotalShowsCountSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        isShowsUpdating: getIsShowsUpdatingSel(state),
        slides: getSlidesSortedSel(state),
    }
};

/*Compose служит для комбинации всех оберток над компонентой*/
export default compose(
    connect(mapStateToProps, {getShows, deleteShow, setCurrentPage, setTotalShowsCount, toggleIsFetching, toggleIsShowsUpdating, getSlides}),
    withRouter,
    withAuthRedirect
)(ShowsContainer);