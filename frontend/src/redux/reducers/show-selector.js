import {createSelector} from "reselect";

export const getShowsSel = (state) => {
    return state.showsReducer.shows
};

/*Complex Selector*/
export const getShowsSelSorted = createSelector(getShowsSel, (shows)=>{
    return shows;
});
export const getShowSel = (state) => {
    return state.showsReducer.show
};

export const getPageSizeSel = (state) => {
    return state.showsReducer.pageSize
};

export const getTotalShowsCountSel = (state) => {
    return state.showsReducer.totalShowsCount
};

export const getCurrentPageSel = (state) => {
    return state.showsReducer.currentPage
};

export const getIsFetchingSel = (state) => {
    return state.showsReducer.isFetching
};

export const getIsShowsUpdatingSel = (state) => {
    return state.showsReducer.isShowsUpdating
};