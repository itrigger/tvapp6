import {playAPI, showAPI, slidesAPI as slidesApi} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";


const SET_SLIDES = 'pu/SET_SLIDES';
const TOGGLE_IS_FETCHING = 'pu/TOGGLE_IS_FETCHING';
const SET_TOTAL_SLIDES = 'pu/SET_TOTAL_SLIDES';

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

export const getSlides = (place, screen_num) => async (dispatch) => {

    dispatch(toggleIsFetching(true));
    let slidesArr = [];
    let data = await playAPI.getSlides(place, screen_num);
    if (data.resultCode === 0) {

        if(data.showID){
            let data2 =  await showAPI.getShow(data.showID);
            if(data2.resultCode === 0){
                if(data2.item.slides){
                    let arr = data2.item.slides.split(';');
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] !== '') {
                            let arr2 = await slidesApi.getSlide(arr[i]);
                            if(arr2.slide.isactive === "1") {
                                slidesArr.push(arr2.slide);
                            }
                        }
                    }
                }
            }
        }
        dispatch(setSlides(slidesArr));
        dispatch(setTotalSlidesCount(slidesArr.length));
        Notify('TVAPP', 'Слайды обновлены', 'success');

    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
    }
    dispatch(toggleIsFetching(false));

};


export const getSlidesByID = (showID) => async (dispatch) => {

    dispatch(toggleIsFetching(true));
    let slidesArr = [];

        if(showID){
            let data2 =  await showAPI.getShow(showID);
            if(data2.resultCode === 0){
                if(data2.item.slides){
                    let arr = data2.item.slides.split(';');
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] !== '') {
                            let arr2 = await slidesApi.getSlide(arr[i]);
                            if(arr2.slide.isactive === "1") {
                                slidesArr.push(arr2.slide);
                            }
                        }
                    }
                }
            }
            dispatch(setSlides(slidesArr));
            dispatch(setTotalSlidesCount(slidesArr.length));
            Notify('TVAPP', 'Слайды обновлены', 'success');
            dispatch(toggleIsFetching(false));
        } else {
            Notify('TVAPP', 'Ошибка', 'danger');
            dispatch(toggleIsFetching(false));
        }

};

export default playandupdate;