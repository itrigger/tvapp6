const SET_SLIDE = 'SET_SLIDE';
const LOAD = 'redux-form-examples/account/LOAD'

let initialState = {
    slide:[{
        place: null,
        slide_num: null,
        screen_num: null,
        isactive: null,
        slide_content: null
    }]
}

const sliderUpdateReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SLIDE:
            return{
                ...state, slide: action.slide
            }
        case LOAD:
            return {
                slide: action.slide
            }
        default:
            return state;
    }

};


export const setSlide = (slide) => {return {type: SET_SLIDE, slide}};
export const loadAC = (slide) => {return {type: LOAD, slide}};

export default sliderUpdateReducer;