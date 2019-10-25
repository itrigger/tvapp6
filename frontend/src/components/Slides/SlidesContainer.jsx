import React from 'react';
import 'react-notifications-component/dist/theme.css';
import s from './slides.module.css';
import loader from '../../assets/img/loader.svg';
import {connect} from 'react-redux';
import {
    activeOff,
    activeOn,
    setCurrentPage,
    setSlides,
    setTotalSlidesCount, toggleIsFetching
} from "../../redux/reducers/slide-reducer";
import * as axios from "axios";
import Slides from "./Slides";
import Preloader from "../common/Preloader/Preloader";


class SlidesContainer extends React.Component {

    componentDidMount() {
        debugger;
        if (this.props.slides.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get(`http://localhost:3012/api/slides?page=${this.props.currentPage}&size=${this.props.pageSize}`)
                .then(res => {
                    this.props.setSlides(res.data.items);
                    this.props.setTotalSlidesCount(res.data.count);
                    this.props.toggleIsFetching(false);
                })
        }

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`http://localhost:3012/api/slides?page=${pageNumber}&size=${this.props.pageSize}`).then(res => {
            this.props.setSlides(res.data.items);
            this.props.toggleIsFetching(false);
        })
    }

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
        slides: state.sliderReducer.slide,
        pageSize: state.sliderReducer.pageSize,
        totalSlidesCount: state.sliderReducer.totalSlidesCount,
        currentPage: state.sliderReducer.currentPage,
        isFetching: state.sliderReducer.isFetching
    }
};


export default connect(mapStateToProps, {
    activeOn, activeOff, setSlides, setCurrentPage, setTotalSlidesCount, toggleIsFetching
})(SlidesContainer);