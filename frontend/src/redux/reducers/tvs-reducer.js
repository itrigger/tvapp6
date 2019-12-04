import {tvsAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";

const ACTIVE_TV_ON = 'ACTIVE_TV_ON';
const ACTIVE_TV_OFF = 'ACTIVE_TV_OFF';
const SET_TVS = 'SET_TVS';
const SET_TV = 'SET_TV';
const DELETE_TV = 'DELETE_TV';
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
        _id: null,
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
        case ACTIVE_TV_ON:
            return {
                ...state,
                tvs: state.tvs.map(s => {
                    if (s._id === action.tvId) {
                        return {...s, isactive: '1'}
                    }
                    return s;
                })
            }
        case ACTIVE_TV_OFF:
            return {
                ...state,
                tvs: state.tvs.map(s => {
                    if (s._id === action.tvId) {
                        return {...s, isactive: '0'}
                    }
                    return s;
                })
            }
        case SET_TV:
            return {
                ...state, tv: action.tv
            }
        case SET_TVS:
            return {
                ...state, tvs: action.tvs
            }
        case DELETE_TV:
            return {
                ...state,
                tvs: state.tvs.filter(tv => tv._id !== action.id)
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_TVS_UPDATING:
            return {
                ...state,
                isTVsUpdating: action.isFetching
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

export const setTVs = (tvs) => {
    return {type: SET_TVS, tvs}
};
export const setTV = (tv) => {
    return {type: SET_TV, tv}
};
export const activeTVOn = (tvId) => {
    return {type: ACTIVE_TV_ON, tvId}
};
export const activeTVOff = (tvId) => {
    return {type: ACTIVE_TV_OFF, tvId}
};
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
export const setTotalTVsCount = (totalTVsCount) => {
    return {type: SET_TOTAL_TVS_COUNT, totalTVsCount}
};
export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};
export const toggleIsTVsUpdating = (isFetching, tvID) => {
    return {type: TOGGLE_IS_TVS_UPDATING, isFetching, tvID}
};

export const deleteTVAC = (id) => {  return {type: DELETE_TV, id}};

export const getTVs = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        tvsAPI.getTVs(currentPage, pageSize).then(data => {
            if (data.resultCode === 0) {
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

export const getTV = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        tvsAPI.getTV(id).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setTV(data));
        });
    }
};

export const putTVActive = (id, tv, active) => {
    return (dispatch) => {
        dispatch(toggleIsTVsUpdating(true, id));
        tvsAPI.putTVActive(id, tv)
            .then(data => {
                Notify('TVAPP', 'Панель обновлена', 'success');
                dispatch(toggleIsTVsUpdating(false, id));
            });
        active ? dispatch(activeTVOff(id)) : dispatch(activeTVOn(id));
    }
};

export const putTV = (id, tv) => {
    return (dispatch) => {
        dispatch(toggleIsTVsUpdating(true, id));
        tvsAPI.putTV(id, tv)
            .then(data => {
                if (data.resultCode === 0) {
                    Notify('TVAPP', 'Панель обновлена', 'success');
                    dispatch(toggleIsTVsUpdating(false, id));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};


export const createTV = (tv) => {
    return (dispatch) => {
        tvsAPI.createTV(tv)
            .then(data => {
                if (data.resultCode === 0) {
                    Notify('TVAPP', 'Панель добавлена', 'success');
                    dispatch(setTV(tv));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};

export const deleteTV = (id) => {
    return (dispatch) => {
        tvsAPI.deleteTV(id)
            .then(data => {
                if(data.resultCode === 0) {
                    Notify('TVAPP', 'Панель удалена', 'success');
                    dispatch(deleteTVAC(id));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};


export default tvsReducer;