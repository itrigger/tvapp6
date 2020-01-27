import {createSelector} from "reselect";
import schedulesReducer from "./schedule-reducer";

export const getSchedulesSel = (state) => {
    return state.schedulesReducer.schedules
};

/*Complex Selector*/
export const getSchedulesSelSorted = createSelector(getSchedulesSel, (schedules)=>{
    return schedules;
});
export const getScheduleSel = (state) => {
    return state.schedulesReducer.schedule
};

export const getPageSizeSel = (state) => {
    return state.schedulesReducer.pageSize
};

export const getTotalSchedulesCountSel = (state) => {
    return state.schedulesReducer.totalSchedulesCount
};

export const getCurrentPageSel = (state) => {
    return state.schedulesReducer.currentPage
};

export const getIsFetchingSel = (state) => {
    return state.schedulesReducer.isFetching
};

export const getIsSchedulesUpdatingSel = (state) => {
    return state.schedulesReducer.isSchedulesUpdating
};