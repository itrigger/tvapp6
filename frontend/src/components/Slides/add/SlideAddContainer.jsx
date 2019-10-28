import React from 'react';
import * as axios from "axios";
import 'react-notifications-component/dist/theme.css';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/reducers/slide-reducer";
import SlideAdd from "./SlideAdd";
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        newPostText: state.sliderReducer.newPostText
        //history: props.history.push('/slides')
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());

        },
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        }
    }
};

const SlideAddContainer = connect(mapStateToProps, mapDispatchToProps)(SlideAdd);

export default SlideAddContainer;