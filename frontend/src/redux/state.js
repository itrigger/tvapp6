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
        console.log('state is changed');
    },
    addPost() {
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
    },
    updateNewPostText(data){
        this._state.slides.newPostText = data;
        this._callSubscribes(this._state);
    },
    subscribe(observer) {
        this._callSubscribes = observer; //паттерн observer
    }
};


export default store;
window.store = store;

