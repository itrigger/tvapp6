import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {setSlide} from "../../../redux/reducers/slideUpdate-reducer";
import {withRouter} from "react-router-dom";
import {Notify} from "../../common/Notificator/notificator";
import {slidesAPI} from "../../../api/api";
import SlideAddForm from "./SlideAddForm";



class SlideAddContainer extends React.Component {

    componentDidMount() {

    };

    onSubmit = (slide) => {
        slidesAPI.putSlide(this.props.match.params.id, {slide}).then(data => {
            Notify('TVAPP', 'Слайд обновлен', 'success');
            //history: this.props.history.push('/slides')
        })
    };

    render() {
        return (
            <SlideAddForm initialValues={this.props.slide} url={this.props.match.params.id}
                             onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderUpdateReducer.slide
    }
};


let WithUrlDataContainerComponent2 = withRouter(SlideAddContainer);

export default connect(mapStateToProps, {setSlide})(WithUrlDataContainerComponent2);