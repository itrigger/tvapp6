import {tvsAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";

const SET_TVS = 'SET_TVS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_TVS_COUNT = 'SET_TOTAL_TVS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_TVS_UPDATING = 'TOGGLE_IS_TVS_UPDATING';

let initialState = {
    tvs: [],
    pageSize: 4,
    totalTVsCount: 0,
    currentPage: 1,
    tv: {
        place: null,
        number: null,
        channel: null,
        isactive: null
    },
    isFetching: false,
    isTVsUpdating: []
}

const tvsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TVS:
            return {
                ...state, tvs: action.tvs
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_TVS_UPDATING:
            return {
                ...state,
                isSlidesUpdating: action.isFetching
                    ? [...state.isTVsUpdating, action.tvID]
                    : [...state.isTVsUpdating.filter(id => id !== action.tvID)]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_TVS_COUNT:
            return {
                ...state, totalTVsCount: action.totalTVsCount
            }
        default:
            return state;
    }
};

export const setTVs = (tvs) => {  return {type: SET_TVS, tvs}};
export const setCurrentPage = (currentPage) => {    return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalTVsCount = (totalTVsCount) => {    return {type: SET_TOTAL_TVS_COUNT, totalTVsCount}};
export const toggleIsFetching = (isFetching) => {    return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsTVsUpdating = (isFetching, tvID) => {    return {type: TOGGLE_IS_TVS_UPDATING, isFetching, tvID}};




export const getTVs = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        tvsAPI.getTVs(currentPage, pageSize).then(data => {
            if(data.resultCode === 0){
                dispatch(setTVs(data.items));
                dispatch(setTotalTVsCount(data.count));
            } else {
                Notify('TVAPP', 'Ошибка получения данных', 'danger');
                dispatch(setAuthFalse());
            }
            dispatch(toggleIsFetching(false));
        });
    }
};

export default tvsReducer;