import {placesAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import React from "react";


const ACTIVE_PLACE_ON = 'place/ACTIVE_PLACE_ON';
const ACTIVE_PLACE_OFF = 'place/ACTIVE_PLACE_OFF';
const SET_PLACES = 'place/SET_PLACES';
const SET_PLACE = 'place/SET_PLACE';
const DELETE_PLACE = 'place/DELETE_PLACE';
const SET_CURRENT_PAGE = 'place/SET_CURRENT_PAGE';
const SET_TOTAL_PLACES_COUNT = 'place/SET_TOTAL_PLACES_COUNT';
const TOGGLE_IS_FETCHING = 'place/TOGGLE_IS_FETCHING';
const TOGGLE_IS_PLACES_UPDATING = 'place/TOGGLE_IS_PLACES_UPDATING';

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

export const getPlaces = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await placesAPI.getPlaces(currentPage, pageSize);

    if (data.resultCode === 0) {
        dispatch(setPlaces(data.items));
        dispatch(setTotalPlacesCount(data.count));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const getPlace = (id) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await placesAPI.getPlace(id);

    if (data.resultCode === 0) {
        dispatch(setPlace(data.item));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const putPlaceActive = (id, place, active) => async (dispatch) => {

    dispatch(toggleIsPlacesUpdating(true, id));

    let data = await placesAPI.putPlaceActive(id, place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка обновлена', 'success');
        dispatch(toggleIsPlacesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsPlacesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

    active ? dispatch(activePlaceOff(id)) : dispatch(activePlaceOn(id));

};

export const putPlace = (id, place) => async (dispatch) => {

    dispatch(toggleIsPlacesUpdating(true, id));

    let data = await placesAPI.putPlace(id, place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка обновлена', 'success');
        dispatch(toggleIsPlacesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsPlacesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};


export const createPlace = (place) => async (dispatch) => {

    let data = await placesAPI.createPlace(place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка добавлена', 'success');
        dispatch(setPlace(place));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const deletePlace = (id) => async (dispatch) => {

    let data = await placesAPI.deletePlace(id);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка удалена', 'success');
        dispatch(deletePlaceAC(id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};


export default placesReducer;