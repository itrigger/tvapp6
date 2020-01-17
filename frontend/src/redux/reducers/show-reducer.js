import {showAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";


const SET_SHOWS = 'show/SET_SHOWS';
const SET_SHOW = 'show/SET_SHOW';
const DELETE_SHOW = 'show/DELETE_SHOW';
const SET_CURRENT_PAGE = 'show/SET_CURRENT_PAGE';
const SET_TOTAL_SHOWS_COUNT = 'show/SET_TOTAL_SHOWS_COUNT';
const TOGGLE_IS_FETCHING = 'show/TOGGLE_IS_FETCHING';
const TOGGLE_IS_SHOWS_UPDATING = 'show/TOGGLE_IS_SHOWS_UPDATING';

let initialState = {
    shows: [],
    pageSize: 10,
    totalShowsCount: 0,
    currentPage: 1,
    show: {
        _id: null,
        name: null,
        description: null,
        isactive: null
    },
    isFetching: false,
    isShowsUpdating: []
}

const showsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SHOW:
            return {
                ...state, show: action.show
            }
        case SET_SHOWS:
            return {
                ...state, shows: action.shows
            }
        case DELETE_SHOW:
            return {
                ...state,
                shows: state.shows.filter(show => show._id !== action.id)
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_SHOWS_UPDATING:
            return {
                ...state,
                isShowsUpdating: action.isFetching
                    ? [...state.isShowsUpdating, action.id]
                    : [...state.isShowsUpdating.filter(id => id !== action.id)]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_SHOWS_COUNT:
            return {
                ...state, totalShowsCount: action.totalShowsCount
            }
        default:
            return state;
    }
};

export const setShows = (shows) => {return {type: SET_SHOWS, shows}};
export const setShow = (show) => {return {type: SET_SHOW, show}};
export const setCurrentPage = (currentPage) => {return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalShowsCount = (totalShowsCount) => {return {type: SET_TOTAL_SHOWS_COUNT, totalShowsCount}};
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsShowsUpdating = (isFetching, id) => {return {type: TOGGLE_IS_SHOWS_UPDATING, isFetching, id}};
export const deleteShowAC = (id) => {  return {type: DELETE_SHOW, id}};

export const getShows = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await showAPI.getShows(currentPage, pageSize);

    if (data.resultCode === 0) {
        dispatch(setShows(data.items));
        dispatch(setTotalShowsCount(data.count));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
    }

};

export const getShow = (id) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await showAPI.getShow(id);

    if (data.resultCode === 0) {
        dispatch(setShow(data.item));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
    }

};



export const putShow = (id, show) => async (dispatch) => {

    dispatch(toggleIsShowsUpdating(true, id));

    let data = await showAPI.putShow(id, show);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Шоу обновлено', 'success');
        dispatch(toggleIsShowsUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};


export const createShow = (show) => async (dispatch) => {

    let data = await showAPI.createShow(show);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Шоу добавлено', 'success');
        dispatch(setShow(show));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};

export const deleteShow = (id) => async (dispatch) => {

    let data = await showAPI.deleteShow(id);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка удалена', 'success');
        dispatch(deleteShowAC(id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};


export default showsReducer;