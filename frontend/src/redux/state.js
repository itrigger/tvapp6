const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let store = {
    _state: {
        slides: {
            slide:[
                {_id:'5d806f5e1c9d440000de0f2b1', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa0000000"},
                {_id:'5d806f5e1c9d440000de0f2b2', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa1111111"},
                {_id:'5d806f5e1c9d440000de0f2b3', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa222222222"}
            ],
            newPostText: "test"
        }
    },
    getState(){
      return this._state;
    },
    _callSubscribes(){
        console.log(this._state.slides.newPostText);
    },
    subscribe(observer) {
        this._callSubscribes = observer; //паттерн observer
    },

    dispatch(action){
        if (action.type === 'ADD-POST'){
            let newSlide ={
                _id: '5d806f5e1c9d440000de0f2b22',
                place: 'zum',
                slide_num: '2',
                screen_num: '2',
                isactive: '1',
                slide_content: this._state.slides.newPostText
            };

            this._state.slides.slide.push(newSlide);
            this._state.slides.newPostText='';
            this._callSubscribes(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT'){
            this._state.slides.newPostText = action.data;
            this._callSubscribes(this._state);
        }
    }
};


export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
};

export const updateNewPostTextActionCreator = (text) =>{
    return {
        type: UPDATE_NEW_POST_TEXT,
        data: text
    }
};

export default store;
window.store = store;

