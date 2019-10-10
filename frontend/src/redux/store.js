import sliderReducer from "./reducers/slide-reducer";



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
        this._state.slides =  sliderReducer(this._state.slides, action);

        this._callSubscribes(this._state);
    }
};


export default store;
window.store = store;

