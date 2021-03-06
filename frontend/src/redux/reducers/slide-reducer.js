import {slidesAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import React from "react";

const ACTIVE_ON = 'slide/ACTIVE_ON';
const ACTIVE_OFF = 'slide/ACTIVE_OFF';
const SET_SLIDE = 'slide/SET_SLIDE';
const DELETE_SLIDE = 'slide/DELETE_SLIDE';
const SET_SLIDES = 'slide/SET_SLIDES';
const SET_CURRENT_PAGE = 'slide/SET_CURRENT_PAGE';
const SET_TOTAL_SLIDES_COUNT = 'slide/SET_TOTAL_SLIDES_COUNT';
const TOGGLE_IS_FETCHING = 'slide/TOGGLE_IS_FETCHING';
const TOGGLE_IS_SLIDES_UPDATING = 'slide/TOGGLE_IS_SLIDES_UPDATING';

let initialState = {
    slides: [],
    pageSize: 10,
    totalSlidesCount: 0,
    currentPage: 1,
    slide: {
        _id: null,
        screen_num: null,
        isactive: null,
        delay: null,
        type: null,
        slide_content: null

    },
    isFetching: false,
    isSlidesUpdating: []
}

const sliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIVE_ON:
            return {
                ...state,
                slides: state.slides.map(s => {
                    if (s._id === action.slideId) {
                        return {...s, isactive: '1'}
                    }
                    return s;
                })
            }
        case ACTIVE_OFF:
            return {
                ...state,
                slides: state.slides.map(s => {
                    if (s._id === action.slideId) {
                        return {...s, isactive: '0'}
                    }
                    return s;
                })
            }
        case SET_SLIDE:
            return {
                ...state, slide: action.slide
            }
        case DELETE_SLIDE:
            return {
                ...state,
                slides: state.slides.filter(slide => slide._id !== action.id)
            }
        case SET_SLIDES:
            return {
                ...state, slides: action.slides
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_SLIDES_COUNT:
            return {
                ...state, totalSlidesCount: action.totalSlidesCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_SLIDES_UPDATING:
            return {
                ...state,
                isSlidesUpdating: action.isFetching
                    ? [...state.isSlidesUpdating, action.slideID]
                    : [...state.isSlidesUpdating.filter(id => id !== action.slideID)]
            }
        default:
            return state;
    }
};

export const setSlides = (slides) => { return {type: SET_SLIDES, slides}};
export const deleteSlideAC = (id) => { return {type: DELETE_SLIDE, id}};
export const setSlide = (slide) => { return {type: SET_SLIDE, slide}};
export const activeOn = (slideId) => { return {type: ACTIVE_ON, slideId}};
export const activeOff = (slideId) => { return {type: ACTIVE_OFF, slideId}};
export const setCurrentPage = (currentPage) => { return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalSlidesCount = (totalSlidesCount) => { return {type: SET_TOTAL_SLIDES_COUNT, totalSlidesCount}};
export const toggleIsFetching = (isFetching) => { return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsSlidesUpdating = (isFetching, slideID) => { return {type: TOGGLE_IS_SLIDES_UPDATING, isFetching, slideID}};

/*Thunk позволяет создать цепочку диспатчей с зависимостями*/
export const getSlide = (id) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await slidesAPI.getSlide(id);

    if (data.resultCode === 0) {
        dispatch(toggleIsFetching(false));
        dispatch(setSlide(data.slide));
    }else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const getSlides = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await slidesAPI.getSlides(currentPage, pageSize);

    if (data.resultCode === 0) {
        dispatch(setSlides(data.items));
        dispatch(setTotalSlidesCount(data.count));
        dispatch(toggleIsFetching(false));
    }  else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const putSlideActive = (id, slide, active) => async (dispatch) => {

    dispatch(toggleIsSlidesUpdating(true, id));

    let data = await slidesAPI.putSlideActive(id, slide);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Видимость слайда обновлена', 'success');
        dispatch(toggleIsSlidesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsSlidesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }
    active ? dispatch(activeOff(id)) : dispatch(activeOn(id));

};

export const putSlide = (id, slide) => async (dispatch) => {

    dispatch(toggleIsSlidesUpdating(true, id));

    let data = await slidesAPI.putSlide(id, slide);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Слайд обновлен', 'success');
        dispatch(toggleIsSlidesUpdating(false, id));
    }  else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsSlidesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const createSlide = (slide) => async (dispatch) => {

    let data = await slidesAPI.createSlide(slide);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Слайд добавлен', 'success');
        dispatch(setSlide(slide));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const deleteSlide = (id) => async (dispatch) => {

    let data = await slidesAPI.deleteSlide(id)

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Слайд удален', 'success');
        dispatch(deleteSlideAC(id));
    }  else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export default sliderReducer;