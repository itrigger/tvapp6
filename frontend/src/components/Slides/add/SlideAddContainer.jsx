import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {setSlide} from "../../../redux/reducers/slide-reducer";
import {withRouter} from "react-router-dom";
import {Notify} from "../../common/Notificator/notificator";
import {slidesAPI} from "../../../api/api";
import SlideAddForm from "./SlideAddForm";
import sliderReducer, {createSlide} from "../../../redux/reducers/slide-reducer";



class SlideAddContainer extends React.Component {


    onSubmit = (slide) => {
        /*this.props.createSlide({slide}).then(data => {   })*/
        slidesAPI.createSlide({slide}).then(data => {
            Notify('TVAPP', 'Слайд обновлен', 'success');
            //history: this.props.history.push('/slides')
        })

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


let WithUrlDataContainerComponent2 = withRouter(SlideAddContainer);

export default connect(mapStateToProps, {setSlide})(WithUrlDataContainerComponent2);