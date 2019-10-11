import React from 'react';
import * as axios from "axios";
import 'react-notifications-component/dist/theme.css';
import Slides from "./Slides";
import { connect } from 'react-redux';



let mapStateToProps = (state) => {
    return {
        slides: state.sliderReducer.slide
    }
};

let mapDispatchToProps = (dispatch) => {
    return {

    }
};

const SlidesContainer = connect(mapStateToProps, mapDispatchToProps)(Slides);

export default SlidesContainer;