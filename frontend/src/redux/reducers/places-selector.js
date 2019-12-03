import {createSelector} from "reselect";

export const getPlacesSel = (state) => {
    return state.placesReducer.places
};

/*Complex Selector*/
export const getPlacesSelSorted = createSelector(getPlacesSel, (places)=>{
    return places;
});
export const getPlaceSel = (state) => {
    return state.placesReducer.place
};
export const getPageSizeSel = (state) => {
    return state.placesReducer.pageSize
};

export const getTotalPlacesCountSel = (state) => {
    return state.placesReducer.totalPlacesCount
};

export const getCurrentPageSel = (state) => {
    return state.placesReducer.currentPage
};

export const getIsFetchingSel = (state) => {
    return state.placesReducer.isFetching
};

export const getIsPlacesUpdatingSel = (state) => {
    return state.placesReducer.isPlacesUpdating
};