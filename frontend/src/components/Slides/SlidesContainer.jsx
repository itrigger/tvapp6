import React from 'react';
import * as axios from "axios";
/*import state from "../../redux/state";*/
/*import { store } from 'react-notifications-component';*/
import 'react-notifications-component/dist/theme.css';
/*import state from "../../redux/state";*/
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../redux/reducers/slide-reducer";
import Slides from "./Slides";



/*export default class SlideAdd extends React.Component {*/
const SlidesContainer = (props) => {

   // let newPostElement = React.createRef();
    let addPost = () =>{
        props.store.dispatch(addPostActionCreator());
        props.history.push('/slides');
    };
    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    };


    return ( <Slides slides={props.slides} updateNewPostText={onPostChange} addPost={addPost} /> )
    // }
};

export default SlidesContainer;