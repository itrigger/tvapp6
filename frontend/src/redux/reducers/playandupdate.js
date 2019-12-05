import {playAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";


const SET_SLIDES = 'SET_SLIDES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_TOTAL_SLIDES = 'SET_TOTAL_SLIDES';

let initialState = {
    slides: [],
    totalSlides: 1,
    isFetching: false
}

const playandupdate = (state = initialState, action) => {

    switch (action.type) {
        case SET_SLIDES:
            return {
                ...state, slides: action.slides
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_TOTAL_SLIDES:
            return {
                ...state, totalSlides: action.totalSlides
            }
        default:
            return state;
    }
};

export const setSlides = (slides) => {return {type: SET_SLIDES, slides}};
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
export const setTotalSlidesCount = (totalSlides) => {return {type: SET_TOTAL_SLIDES, totalSlides}};

export const getSlides = (place, screen_num) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        playAPI.getSlides(place, screen_num).then(data => {
            if (data.resultCode === 0) {
                dispatch(setSlides(data.slides));
                dispatch(setTotalSlidesCount(data.count));
            } else {
                Notify('TVAPP', 'Ошибка получения данных', 'danger');
            }
            dispatch(toggleIsFetching(false));
        });
    }
};

export default playandupdate;