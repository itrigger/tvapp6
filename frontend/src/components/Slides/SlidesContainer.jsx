import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import {
    activeOff,
    activeOn,
    getSlides,
    putSlideActive,
    setCurrentPage,
    setTotalSlidesCount,
    toggleIsFetching,
    toggleIsSlidesUpdating
} from "../../redux/reducers/slide-reducer";
import Slides from "./Slides";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {currentPageSel, getSlidesSortedSel, isFetchingSel, isSlidesUpdatingSel, pageSizeSel, totalSlidesCountSel} from "../../redux/reducers/slide-selector";



class SlidesContainer extends React.Component {

    componentDidMount() {
        this.props.getSlides(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getSlides(pageNumber, this.props.pageSize);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Slides
                totalSlidesCount={this.props.totalSlidesCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                slides={this.props.slides}
                activeOff={this.props.activeOff}
                activeOn={this.props.activeOn}
                isFetching = {this.props.isFetching}
                isSlidesUpdating = {this.props.isSlidesUpdating}
                toggleIsSlidesUpdating = {this.props.toggleIsSlidesUpdating}
                putSlideActive = {this.props.putSlideActive}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        slides: getSlidesSortedSel(state),
        pageSize: pageSizeSel(state),
        totalSlidesCount: totalSlidesCountSel(state),
        currentPage: currentPageSel(state),
        isFetching: isFetchingSel(state),
        isSlidesUpdating: isSlidesUpdatingSel(state)
    }
};

/*Compose служит для комбинации всех оберток над компонентой*/
export default compose(
    connect(mapStateToProps, {activeOn, activeOff, getSlides, putSlideActive, setCurrentPage, setTotalSlidesCount, toggleIsFetching, toggleIsSlidesUpdating}),
    withRouter,
    withAuthRedirect
)(SlidesContainer);