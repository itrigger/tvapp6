const SET_SLIDE = 'SET_SLIDE';
const LOAD = 'redux-form-examples/account/LOAD'

let initialState = {
    slide:[{
        place: 'zum',
        slide_num: '1',
        screen_num: '1',
        isactive: '1',
        slide_content: 'werqwerqwe'
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