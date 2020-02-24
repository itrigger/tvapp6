import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

export const getTVsSel = (state:AppStateType) => {
    return state.tvsReducer.tvs
};

/*Complex Selector*/
export const getTVsSelSorted = createSelector(getTVsSel, (tvs)=>{
   tvs.sort(function(a:number, b:number){
      return a-b
   });
   return tvs.reverse();
});
export const getTVSel = (state:AppStateType) => {
    return state.tvsReducer.tv
};
export const getPageSizeSel = (state:AppStateType) => {
    return state.tvsReducer.pageSize
};

export const getTotalTVsCountSel = (state:AppStateType) => {
    return state.tvsReducer.totalTVsCount
};

export const getCurrentPageSel = (state:AppStateType) => {
    return state.tvsReducer.currentPage
};

export const getIsFetchingSel = (state:AppStateType) => {
    return state.tvsReducer.isFetching
};

export const getIsTVsUpdatingSel = (state:AppStateType) => {
    return state.tvsReducer.isTVsUpdating
};