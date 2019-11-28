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
        slides: state.sliderReducer.slides,
        pageSize: state.sliderReducer.pageSize,
        totalSlidesCount: state.sliderReducer.totalSlidesCount,
        currentPage: state.sliderReducer.currentPage,
        isFetching: state.sliderReducer.isFetching,
        isSlidesUpdating: state.sliderReducer.isSlidesUpdating
    }
};

export default compose(
    connect(mapStateToProps, {activeOn, activeOff, getSlides, putSlideActive, setCurrentPage, setTotalSlidesCount, toggleIsFetching, toggleIsSlidesUpdating}),
    withRouter,
    withAuthRedirect
)(SlidesContainer);