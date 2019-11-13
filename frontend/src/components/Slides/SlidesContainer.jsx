import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import {
    activeOff,
    activeOn,
    setCurrentPage,
    setSlides,
    setTotalSlidesCount, toggleIsFetching
} from "../../redux/reducers/slide-reducer";
import Slides from "./Slides";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {slidesAPI} from "../../api/api";


class SlidesContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        slidesAPI.getSlides(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setSlides(data.items);
            this.props.setTotalSlidesCount(data.count);
            this.props.toggleIsFetching(false);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        slidesAPI.getSlides(pageNumber, this.props.pageSize).then(data => {
            this.props.setSlides(data.items);
            this.props.toggleIsFetching(false);
        });
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
        isFetching: state.sliderReducer.isFetching
    }
};

let WithUrlDataContainerComponent = withRouter(SlidesContainer);

export default connect(mapStateToProps, {
    activeOn, activeOff, setSlides, setCurrentPage, setTotalSlidesCount, toggleIsFetching
})(WithUrlDataContainerComponent);