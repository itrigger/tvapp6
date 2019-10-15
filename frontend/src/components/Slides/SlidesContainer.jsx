import React from 'react';
import * as axios from "axios";
import 'react-notifications-component/dist/theme.css';
import Slides from "./Slides";
import { connect } from 'react-redux';
import {activeOffAC, activeOnAC, setSlidesAC} from "../../redux/reducers/slide-reducer";



let mapStateToProps = (state) => {
    return {
        slides: state.sliderReducer.slide
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        activeOn: (slideId) => {
            dispatch(activeOnAC(slideId));
        },
        activeOff: (slideId) => {
            dispatch(activeOffAC(slideId));
        },
        setSlides: (slide)=>{
            dispatch(setSlidesAC(slide));
        }
    }
};

const SlidesContainer = connect(mapStateToProps, mapDispatchToProps)(Slides);

export default SlidesContainer;