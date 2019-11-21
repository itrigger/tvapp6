import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {createSlide} from "../../../redux/reducers/slide-reducer";
import {withRouter} from "react-router-dom";
import SlideAddForm from "./SlideAddForm";


class SlideAddContainer extends React.Component {

    onSubmit = (slide) => {
        this.props.createSlide({slide});
    };

    render() {
        return (
            <SlideAddForm onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderReducer.slide
    }
};


let WithUrlDataContainerComponent = withRouter(SlideAddContainer);

export default connect(mapStateToProps, {createSlide})(WithUrlDataContainerComponent);