const ADD_SLIDE = 'ADD_SLIDE';
const ACTIVE_ON = 'ACTIVE_ON';
const ACTIVE_OFF = 'ACTIVE_OFF';
const SET_SLIDES = 'SET_SLIDES';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    slide: [
        {
            _id: '5d806f5e1c9d440000de0f2b1',
            place: "zum",
            slide_num: "1",
            screen_num: "1",
            isactive: true,
            slide_content: "content0000000"
        },
        {
            _id: '5d806f5e1c9d440000de0f2b2',
            place: "zum",
            slide_num: "1",
            screen_num: "1",
            isactive: true,
            slide_content: "content1111111"
        },
        {
            _id: '5d806f5e1c9d440000de0f2b3',
            place: "zum",
            slide_num: "1",
            screen_num: "1",
            isactive: false,
            slide_content: "content2222222"
        }
    ],
    newPostText: "test"
}

const sliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIVE_ON:
            return{
                ...state,
                slide: state.slide.map(s=>{
                    if(s._id === action.slideId){
                        return {...s, isactive:true}
                    }
                    return s;
                })
            }
        case ACTIVE_OFF:
            return{
                ...state,
                slide: state.slide.map(s=>{
                    if(s._id === action.slideId){
                        return {...s, isactive:false}
                    }
                    return s;
                })
            }
        case SET_SLIDES:
            return{
                ...state, slide: [...state.slide, ...action.slide]
            }
        case ADD_SLIDE:
            return {
                ...state,
                newPostText: '',
                slide: [...state.slide, {
                    _id: '5d806f5e1c9d440000de0f2b22',
                    place: 'zum',
                    slide_num: '2',
                    screen_num: '2',
                    isactive: true,
                    slide_content: state.newPostText
                }]
            }
        case
        UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.data
            }
        default:
            return state;
    }

};

export const addPostActionCreator = () => {return {type: ADD_SLIDE}};
export const activeOnAC = (slideId) => {return {type: ACTIVE_ON, slideId}};
export const activeOffAC = (slideId) => {return {type: ACTIVE_OFF, slideId}};
export const setSlidesAC = (slide) => {return {type: SET_SLIDES, slide}};

export const updateNewPostTextActionCreator = (text) => {return {type: UPDATE_NEW_POST_TEXT, data: text}};

export default sliderReducer;