import React from 'react';
import * as axios from "axios";
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {myConfig} from "../../../config/config";
import {connect} from "react-redux";
import {
    setSlide
} from "../../../redux/reducers/slideUpdate-reducer";
import {withRouter} from "react-router-dom";
import SlideUpdateForm from "./SlideUpdateForm";
/*import {browserHistory} from "react-router";*/


class SlideUpdateContainer extends React.Component {


    componentDidMount() {
        const url = myConfig.API_URL + '/slides/' + this.props.match.params.id; //формируем ссылку на апи
        console.log('get request');
        axios.get(url)
            .then(res => {
                this.props.setSlide(res.data);
                console.log(this.props.slide);
            });
    };

    onSubmit = (slide) => {
        const url = myConfig.API_URL + '/slides/' + this.props.match.params.id;
        axios.put(url, {slide})
            .then(res => {
                store.addNotification({
                    title: 'TVAPP',
                    message: 'Слайд обновлен',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-left',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
            })
    };

    render() {
        return (
                <SlideUpdateForm initialValues={this.props.slide} url={this.props.match.params.id} onSubmit={this.onSubmit}/>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderUpdateReducer.slide
    }
};

let WithUrlDataContainerComponent2 = withRouter(SlideUpdateContainer);

export default connect(mapStateToProps, {
    setSlide
})(WithUrlDataContainerComponent2);