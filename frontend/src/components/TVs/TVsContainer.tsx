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
import {AppStateType} from "../../redux/redux-store";
import {tvType} from "../../types/types";


type MapStatePropsType ={
    showName: string
    isFetching: boolean
    currentPage: number
    totalSlidesCount: number
    pageSize: number
    tvs: Array<tvType>
    isTVsUpdating: Array<string>
}


type MapDispatchPropsType = {
    getTVs: (currentPage: number, pageSize:number) => void
    getShows: (currentPage:number, pageSize: number)=>void
    setCurrentPage: (pageNumber: number) => void
    deleteTV: (id: any) => void
    reloadTV: (channel: string) => void
    activeTVOff: (tvId:any) => void
    activeTVOn: (tvId:any) => void
    toggleIsTVsUpdating: (isFetching:boolean, tvID:any) => void
    putTVActive: (id:string, tv:tvType, active:string) => void
    setTVs: (tvs:Array<tvType>) => void
    setTotalTVsCount: (totalTVsCount:number) => void
    toggleIsFetching: (isFetching:boolean) => void
}

type OwnProps = {
    pageNumber: number
    id: any
    channel: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class TVsContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getTVs(this.props.currentPage, this.props.pageSize);
        this.props.getShows(1,1000);
    }

    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getTVs(pageNumber, this.props.pageSize);
    };

    deleteTVOnClick = (id:any) => {
        this.props.deleteTV(id);
    };
    reloadTVOnClick = (channel:string) => {
        this.props.reloadTV(channel);
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

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
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

let mapDispatchToProps = (state:AppStateType):MapDispatchPropsType => {
    return{
        activeTVOn,
        activeTVOff,
        deleteTV,
        getTVs,
        reloadTV,
        setTVs,
        setCurrentPage,
        setTotalTVsCount,
        toggleIsFetching,
        toggleIsTVsUpdating,
        putTVActive,
        getShows
    }
};
/*Compose служит для комбинации всех оберток над компонентой*/

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(TVsContainer)