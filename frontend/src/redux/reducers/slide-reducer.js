import {slidesAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";

const ADD_SLIDE = 'ADD_SLIDE';
const ACTIVE_ON = 'ACTIVE_ON';
const ACTIVE_OFF = 'ACTIVE_OFF';
const SET_SLIDE = 'SET_SLIDE';
const SET_SLIDES = 'SET_SLIDES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_SLIDES_COUNT = 'SET_TOTAL_SLIDES_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_SLIDES_UPDATING = 'TOGGLE_IS_SLIDES_UPDATING';

let initialState = {
    slides: [],
    pageSize: 4,
    totalSlidesCount: 0,
    currentPage: 1,
    slide: {
        place: '1',
        slide_num: '2',
        screen_num: '3',
        isactive: '4',
        slide_content: '5'
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
        case ADD_SLIDE:
            return {
                ...state,
                newPostText: '',
                slides: [...state.slides, {
                    _id: '5d806f5e1c9d440000de0f2b22',
                    place: 'zum',
                    slide_num: '2',
                    screen_num: '2',
                    isactive: true,
                    slide_content: state.newPostText
                }]
            }
        default:
            return state;
    }
};

export const setSlides = (slides) => {  return {type: SET_SLIDES, slides}};
export const setSlide = (slide) => {    return {type: SET_SLIDE, slide}};
export const activeOn = (slideId) => {    return {type: ACTIVE_ON, slideId}};
export const activeOff = (slideId) => {    return {type: ACTIVE_OFF, slideId}};
export const setCurrentPage = (currentPage) => {    return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalSlidesCount = (totalSlidesCount) => {    return {type: SET_TOTAL_SLIDES_COUNT, totalSlidesCount}};
export const toggleIsFetching = (isFetching) => {    return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsSlidesUpdating = (isFetching, slideID) => {    return {type: TOGGLE_IS_SLIDES_UPDATING, isFetching, slideID}};


export const getSlide = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        slidesAPI.getSlide(id).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setSlide(data));
        });
    }
};

export const getSlides = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        slidesAPI.getSlides(currentPage, pageSize).then(data => {
            if(data.resultCode === 0){
                dispatch(setSlides(data.items));
                dispatch(setTotalSlidesCount(data.count));
            } else {
                dispatch(setAuthFalse());
            }
            dispatch(toggleIsFetching(false));
        });
    }
};

export const putSlideActive = (id, slide, active) => {
    return (dispatch) => {
        dispatch(toggleIsSlidesUpdating(true, id));
        slidesAPI.putSlideActive(id, slide)
            .then(data => {
                Notify('TVAPP', 'Слайд обновлен', 'success');
                dispatch(toggleIsSlidesUpdating(false, id));
            });
        active ? dispatch(activeOff(id)) : dispatch(activeOn(id));

    }
};
export const putSlide = (id, slide) => {
    return (dispatch) => {
        dispatch(toggleIsSlidesUpdating(true, id));
        slidesAPI.putSlide(id, slide)
            .then(data => {
                Notify('TVAPP', 'Слайд обновлен', 'success');
                dispatch(toggleIsSlidesUpdating(false, id));
            });
    }
};
export const createSlide = (slide) => {
    return (dispatch) => {
        slidesAPI.createSlide(slide)
            .then(data => {
                Notify('TVAPP', 'Слайд добавлен', 'success');
                dispatch(setSlide(slide));
            });
    }
};

export default sliderReducer;