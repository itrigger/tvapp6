import React from 'react';
import Mainpage from "./Mainpage";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getTVs,
    setTotalTVsCount,
    toggleIsTVsUpdating,
    setCurrentPage,
    toggleIsFetching
} from "../../redux/reducers/tvs-reducer";


class MainpageContainer extends React.Component {

    componentDidMount() {
        this.props.getTVs(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getTVs(pageNumber, this.props.pageSize);
    };

    render() {

        return (
            <Mainpage
                totalTVsCount={this.props.totalTVsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                tvs={this.props.tvs}
                isFetching={this.props.isFetching}
                isTVsUpdating={this.props.isTVsUpdating}
                toggleIsTVsUpdating={this.props.toggleIsTVsUpdating}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        tvs: state.tvsReducer.tvs,
        pageSize: state.tvsReducer.pageSize,
        totalTVsCount: state.tvsReducer.totalTVsCount,
        currentPage: state.tvsReducer.currentPage,
        isFetching: state.tvsReducer.isFetching,
        isTVsUpdating: state.tvsReducer.isTVsUpdating
    }
};

export default compose(
    connect(mapStateToProps, {getTVs, setCurrentPage, setTotalTVsCount, toggleIsFetching, toggleIsTVsUpdating}),
    withRouter,
    withAuthRedirect
)(MainpageContainer);