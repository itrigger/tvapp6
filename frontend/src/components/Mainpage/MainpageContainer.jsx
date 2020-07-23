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
import {
    getCurrentPageSel,
    getIsFetchingSel, getIsTVsUpdatingSel,
    getPageSizeSel,
    getTotalTVsCountSel,
    getTVsSelSorted
} from "../../redux/reducers/tvs-selector";


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
        tvs: getTVsSelSorted(state),
        pageSize: getPageSizeSel(state),
        totalTVsCount: getTotalTVsCountSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        isTVsUpdating: getIsTVsUpdatingSel(state)
    }
};

export default compose(
    connect(mapStateToProps, {getTVs, setCurrentPage, setTotalTVsCount, toggleIsFetching, toggleIsTVsUpdating}),
    withRouter,
    withAuthRedirect
)(MainpageContainer);
/*
* ToDo
* Разобраться, почему на главной странице не работает пагинация
* */