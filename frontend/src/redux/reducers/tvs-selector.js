import {createSelector} from "reselect";

export const getTVsSel = (state) => {
    return state.tvsReducer.tvs
};

/*Complex Selector*/
export const getTVsSelSorted = createSelector(getTVsSel, (tvs)=>{
   tvs.sort(function(a,b){
      return a.number-b.number
   });
   return tvs.reverse();
});

export const getPageSizeSel = (state) => {
    return state.tvsReducer.pageSize
};

export const getTotalTVsCountSel = (state) => {
    return state.tvsReducer.totalTVsCount
};

export const getCurrentPageSel = (state) => {
    return state.tvsReducer.currentPage
};

export const getIsFetchingSel = (state) => {
    return state.tvsReducer.isFetching
};

export const getIsTVsUpdatingSel = (state) => {
    return state.tvsReducer.isTVsUpdating
};