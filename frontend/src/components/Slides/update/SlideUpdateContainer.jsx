import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {setSlide} from "../../../redux/reducers/slideUpdate-reducer";
import {withRouter} from "react-router-dom";
import SlideUpdateForm from "./SlideUpdateForm";
import {Notify} from "../../common/Notificator/notificator";
import {slidesAPI} from "../../../api/api";

import {browserHistory} from "react-router";


class SlideUpdateContainer extends React.Component {

    componentDidMount() {
        slidesAPI.getSlide(this.props.match.params.id).then(data => {
            this.props.setSlide(data);
        });
    };

    onSubmit = (slide) => {
        slidesAPI.putSlide(this.props.match.params.id, {slide}).then(data => {
            Notify('TVAPP', 'Слайд обновлен', 'success');

        })
    };

    render() {
        //console.log('render');
        //console.log(this.props.slide);
        return (
            <SlideUpdateForm initialValues={this.props.slide} url={this.props.match.params.id}
                             onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderUpdateReducer.slide
    }
};


let WithUrlDataContainerComponent2 = withRouter(SlideUpdateContainer);

export default connect(mapStateToProps, {setSlide})(WithUrlDataContainerComponent2);