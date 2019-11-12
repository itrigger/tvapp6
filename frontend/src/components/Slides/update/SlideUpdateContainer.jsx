import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {setSlide} from "../../../redux/reducers/slideUpdate-reducer";
import {withRouter} from "react-router-dom";
import SlideUpdateForm from "./SlideUpdateForm";
import {getSlideViaAPI, putSlidesViaAPI} from "../../../api/api";
import {Notify} from "../../common/Notificator/notificator";

/*import {browserHistory} from "react-router";*/


class SlideUpdateContainer extends React.Component {


    componentDidMount() {
        getSlideViaAPI(this.props.match.params.id).then(res => {
            this.props.setSlide(res.data);
        });
    };

    onSubmit = (slide) => {
        putSlidesViaAPI(this.props.match.params.id, {slide}).then(res => {
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