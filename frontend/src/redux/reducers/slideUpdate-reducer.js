const SET_SLIDE = 'SET_SLIDE';

const UPDATE_NEW_SLIDE_PLACE_TEXT = 'UPDATE_NEW_SLIDE_PLACE_TEXT';


let initialState = {
    slide:[]
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
        default:
            return state;
    }

};


export const setSlide = (slide) => {return {type: SET_SLIDE, slide}};

export default sliderUpdateReducer;