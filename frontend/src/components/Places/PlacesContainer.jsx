import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from 'react-redux';
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Places from "./Places";
import {
    activePlaceOff,
    activePlaceOn,
    deletePlace,
    getPlaces,
    putPlaceActive,
    setCurrentPage,
    setTotalPlacesCount, toggleIsFetching, toggleIsPlacesUpdating
} from "../../redux/reducers/places-reducer";
import {
    getCurrentPageSel, getIsFetchingSel, getIsPlacesUpdatingSel,
    getPageSizeSel,
    getPlacesSelSorted,
    getTotalPlacesCountSel
} from "../../redux/reducers/places-selector";


class PlacesContainer extends React.Component {

    componentDidMount() {
        this.props.getPlaces(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getPlaces(pageNumber, this.props.pageSize);
    };

    deletePlaceOnClick = (id) => {
        this.props.deletePlace(id);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Places
                totalPlacesCount={this.props.totalPlacesCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                places={this.props.places}
                activeOff={this.props.activeOff}
                activeOn={this.props.activeOn}
                isFetching = {this.props.isFetching}
                isPlacesUpdating = {this.props.isPlacesUpdating}
                toggleIsPlacesUpdating = {this.props.toggleIsPlacesUpdating}
                putPlaceActive = {this.props.putPlaceActive}
                deletePlace = {this.deletePlaceOnClick}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        places: getPlacesSelSorted(state),
        pageSize: getPageSizeSel(state),
        totalPlacesCount: getTotalPlacesCountSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        isPlacesUpdating: getIsPlacesUpdatingSel(state)
    }
};

/*Compose служит для комбинации всех оберток над компонентой*/
export default compose(
    connect(mapStateToProps, {activePlaceOn, activePlaceOff, getPlaces, deletePlace, putPlaceActive, setCurrentPage, setTotalPlacesCount, toggleIsFetching, toggleIsPlacesUpdating}),
    withRouter,
    withAuthRedirect
)(PlacesContainer);