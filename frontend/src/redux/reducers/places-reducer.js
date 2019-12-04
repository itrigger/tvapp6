import {placesAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";


const ACTIVE_PLACE_ON = 'ACTIVE_PLACE_ON';
const ACTIVE_PLACE_OFF = 'ACTIVE_PLACE_OFF';
const SET_PLACES = 'SET_PLACES';
const SET_PLACE = 'SET_PLACE';
const DELETE_PLACE = 'DELETE_PLACE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PLACES_COUNT = 'SET_TOTAL_PLACES_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_PLACES_UPDATING = 'TOGGLE_IS_PLACES_UPDATING';

let initialState = {
    places: [],
    pageSize: 10,
    totalPlacesCount: 0,
    currentPage: 1,
    place: {
        _id: null,
        name: null,
        description: null,
        isactive: null
    },
    isFetching: false,
    isPlacesUpdating: []
}

const placesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIVE_PLACE_ON:
            return {
                ...state,
                places: state.places.map(s => {
                    if (s._id === action.id) {
                        return {...s, isactive: '1'}
                    }
                    return s;
                })
            }
        case ACTIVE_PLACE_OFF:
            return {
                ...state,
                places: state.places.map(s => {
                    if (s._id === action.id) {
                        return {...s, isactive: '0'}
                    }
                    return s;
                })
            }
        case SET_PLACE:
            return {
                ...state, place: action.place
            }
        case SET_PLACES:
            return {
                ...state, places: action.places
            }
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place._id !== action.id)
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_PLACES_UPDATING:
            return {
                ...state,
                isPlacesUpdating: action.isFetching
                    ? [...state.isPlacesUpdating, action.id]
                    : [...state.isPlacesUpdating.filter(id => id !== action.id)]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_PLACES_COUNT:
            return {
                ...state, totalPlacesCount: action.totalPlacesCount
            }
        default:
            return state;
    }
};

export const setPlaces = (places) => {return {type: SET_PLACES, places}};
export const setPlace = (place) => {return {type: SET_PLACE, place}};
export const activePlaceOn = (id) => {return {type: ACTIVE_PLACE_ON, id}};
export const activePlaceOff = (id) => {return {type: ACTIVE_PLACE_OFF, id}};
export const setCurrentPage = (currentPage) => {return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalPlacesCount = (totalPlacesCount) => {return {type: SET_TOTAL_PLACES_COUNT, totalPlacesCount}};
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsPlacesUpdating = (isFetching, id) => {return {type: TOGGLE_IS_PLACES_UPDATING, isFetching, id}};
export const deletePlaceAC = (id) => {  return {type: DELETE_PLACE, id}};

export const getPlaces = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        placesAPI.getPlaces(currentPage, pageSize).then(data => {
            if (data.resultCode === 0) {
                dispatch(setPlaces(data.items));
                dispatch(setTotalPlacesCount(data.count));
            } else {
                Notify('TVAPP', 'Ошибка получения данных', 'danger');
                dispatch(setAuthFalse());
            }
            dispatch(toggleIsFetching(false));
        });
    }
};

export const getPlace = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        placesAPI.getPlace(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(setPlace(data.item));
            } else {
                Notify('TVAPP', 'Ошибка получения данных', 'danger');
                dispatch(setAuthFalse());
            }
            dispatch(toggleIsFetching(false));
        });
    }
};

export const putPlaceActive = (id, place, active) => {
    return (dispatch) => {
        dispatch(toggleIsPlacesUpdating(true, id));
        placesAPI.putPlaceActive(id, place)
            .then(data => {
                Notify('TVAPP', 'Точка обновлена', 'success');
                dispatch(toggleIsPlacesUpdating(false, id));
            });
        active ? dispatch(activePlaceOff(id)) : dispatch(activePlaceOn(id));
    }
};

export const putPlace = (id, place) => {
    return (dispatch) => {
        dispatch(toggleIsPlacesUpdating(true, id));
        placesAPI.putPlace(id, place)
            .then(data => {
                if (data.resultCode === 0) {
                    Notify('TVAPP', 'Точка обновлена', 'success');
                    dispatch(toggleIsPlacesUpdating(false, id));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};


export const createPlace = (place) => {
    return (dispatch) => {
        placesAPI.createPlace(place)
            .then(data => {
                if (data.resultCode === 0) {
                    Notify('TVAPP', 'Точка добавлена', 'success');
                    dispatch(setPlace(place));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};

export const deletePlace = (id) => {
    return (dispatch) => {
        placesAPI.deletePlace(id)
            .then(data => {
                if(data.resultCode === 0) {
                    Notify('TVAPP', 'Точка удалена', 'success');
                    dispatch(deletePlaceAC(id));
                } else {
                    Notify('TVAPP', 'Ошибка', 'danger');
                    dispatch(setAuthFalse());
                }
            });
    }
};


export default placesReducer;