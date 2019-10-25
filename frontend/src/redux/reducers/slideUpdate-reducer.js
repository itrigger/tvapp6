const SET_SLIDE = 'SET_SLIDES';

const UPDATE_NEW_SLIDE_PLACE_TEXT = 'UPDATE_NEW_SLIDE_PLACE_TEXT';
const UPDATE_NEW_SLIDE_SCREEN_NUM_TEXT = 'UPDATE_NEW_SLIDE_SCREEN_NUM_TEXT';
const UPDATE_NEW_SLIDE_SLIDE_NUM_TEXT = 'UPDATE_NEW_SLIDE_SLIDE_NUM_TEXT';
const UPDATE_NEW_SLIDE_ISACTIVE_TEXT = 'UPDATE_NEW_SLIDE_ISACTIVE_TEXT';
const UPDATE_NEW_SLIDE_CONTENT_TEXT = 'UPDATE_NEW_SLIDE_CONTENT_TEXT';


let initialState = {
    slide:[],
    slideUpdatePlaceInput: '',
    slideUpdateScreenNumInput: '',
    slideUpdateSlideNumInput:'',
    slideUpdateIsActiveInput: true,
    slideUpdateSlideContentInput: ''
}

const sliderUpdateReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SLIDE:
            return{
                ...state, slide: action.slide
            }
        case UPDATE_NEW_SLIDE_PLACE_TEXT:
            return {
                ...state,
                slideUpdatePlaceInput: action.data
            }
        case UPDATE_NEW_SLIDE_SCREEN_NUM_TEXT:
            return {
                ...state,
                slideUpdateScreenNumInput: action.data
            }
        case UPDATE_NEW_SLIDE_SLIDE_NUM_TEXT:
            return {
                ...state,
                slideUpdateSlideNumInput: action.data
            }
        case UPDATE_NEW_SLIDE_ISACTIVE_TEXT:
            return {
                ...state,
                slideUpdateIsActiveInput: action.data
            }
        case UPDATE_NEW_SLIDE_CONTENT_TEXT:
            return {
                ...state,
                slideUpdateSlideContentInput: action.data
            }
        default:
            return state;
    }

};


export const setSlide = (slide) => {return {type: SET_SLIDE, slide}};
export const slideNewUpdatePlaceInputAC = (text) => {return {type: UPDATE_NEW_SLIDE_PLACE_TEXT, data: text}};
export const slideNewUpdateScreenNumInputAC = (text) => {return {type: UPDATE_NEW_SLIDE_SCREEN_NUM_TEXT, data: text}};
export const slideNewUpdateSlideNumInputAC = (text) => {return {type: UPDATE_NEW_SLIDE_SLIDE_NUM_TEXT, data: text}};
export const slideNewUpdateIsActiveInputAC = (text) => {return {type: UPDATE_NEW_SLIDE_ISACTIVE_TEXT, data: text}};
export const slideNewUpdateContentInputAC = (text) => {return {type: UPDATE_NEW_SLIDE_CONTENT_TEXT, data: text}};

export default sliderUpdateReducer;