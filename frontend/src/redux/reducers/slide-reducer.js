const ADD_SLIDE = 'ADD_SLIDE';
const ACTIVE_ON = 'ACTIVE_ON';
const ACTIVE_OFF = 'ACTIVE_OFF';
const SET_SLIDES = 'SET_SLIDES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_SLIDES_COUNT = 'SET_TOTAL_SLIDES_COUNT';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    slides: [],
    pageSize: 4,
    totalSlidesCount: 0,
    currentPage: 1,
    newPostText: "test",
    isFetching: false
}

const sliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIVE_ON:
            return{
                ...state,
                slides: state.slides.map(s=>{
                    if(s._id === action.slideId){
                        return {...s, isactive:true}
                    }
                    return s;
                })
            }
        case ACTIVE_OFF:
            return{
                ...state,
                slides: state.slides.map(s=>{
                    if(s._id === action.slideId){
                        return {...s, isactive:false}
                    }
                    return s;
                })
            }
        case SET_SLIDES:
            return{
                ...state, slides: action.slides
            }
        case SET_CURRENT_PAGE:
            return{
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_SLIDES_COUNT:
            return{
                ...state, totalSlidesCount: action.totalSlidesCount
            }
        case TOGGLE_IS_FETCHING:
            return{
                ...state, isFetching: action.isFetching
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

export const setSlides = (slides) => {return {type: SET_SLIDES, slides}};
export const addPostActionCreator = () => {return {type: ADD_SLIDE}};
export const activeOn = (slideId) => {return {type: ACTIVE_ON, slideId}};
export const activeOff = (slideId) => {return {type: ACTIVE_OFF, slideId}};
export const setCurrentPage = (currentPage) => {return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalSlidesCount = (totalSlidesCount) => {return {type: SET_TOTAL_SLIDES_COUNT, totalSlidesCount}};
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
export const updateNewPostTextActionCreator = (text) => {return {type: UPDATE_NEW_POST_TEXT, data: text}};

export default sliderReducer;