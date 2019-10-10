const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    slide:[
        {_id:'5d806f5e1c9d440000de0f2b1', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"content0000000"},
        {_id:'5d806f5e1c9d440000de0f2b2', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"content1111111"},
        {_id:'5d806f5e1c9d440000de0f2b3', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"content2222222"}
    ],
    newPostText: "test"
}

const sliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newSlide ={
                _id: '5d806f5e1c9d440000de0f2b22',
                place: 'zum',
                slide_num: '2',
                screen_num: '2',
                isactive: '1',
                slide_content: state.newPostText
            };
            state.slide.push(newSlide);
            state.newPostText='';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.data;
            return state;
        default:
            return state;
    }

};

export const addPostActionCreator = () => {return {type: ADD_POST}};
export const updateNewPostTextActionCreator = (text) =>{return {type: UPDATE_NEW_POST_TEXT, data: text}};

export default sliderReducer;