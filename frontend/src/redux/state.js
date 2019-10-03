import {rerenderEntireTree} from './../render';

let state = {
    slides: {
        slide:[
            {_id:'5d806f5e1c9d440000de0f2b1', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa0000000"},
            {_id:'5d806f5e1c9d440000de0f2b2', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa1111111"},
            {_id:'5d806f5e1c9d440000de0f2b3', place:"zum",slide_num:"1",screen_num:"1",isactive:"1",slide_content:"asdfasdfa222222222"}
        ]
    }
};

export let addPost = (data) =>{
    debugger;
    let newSlide ={
        _id: '5d806f5e1c9d440000de0f2b22',
        place: 'zum',
        slide_num: '2',
        screen_num: '2',
        isactive: '1',
        slide_content: data
    };

    state.slides.slide.push(newSlide);
    rerenderEntireTree(state);
};




/*
export const addSlide = () =>{
    let newSlide = {
        id:5,
        place: "zum",
        slide_num:"1",
        screen_num: "1",
        slide_content:"asdasd"
    };
    state.slides.slide.push(newSlide);
    rerenderEntireTree();
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
};*/

export default state;

