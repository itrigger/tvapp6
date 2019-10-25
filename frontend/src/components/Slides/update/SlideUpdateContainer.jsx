import React from 'react';
import * as axios from "axios";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import * as qs from 'query-string';
import {myConfig} from "../../../config/config";
import SlideUpdate from "./SlideUpdate";
import {connect} from "react-redux";
import {
    setSlide,
    slideNewUpdatePlaceInputAC,
    slideNewUpdateScreenNumInputAC,
    slideNewUpdateSlideNumInputAC,
    slideNewUpdateIsActiveInputAC,
    slideNewUpdateContentInputAC
} from "../../../redux/reducers/slideUpdate-reducer";
import {withRouter} from "react-router-dom";
/*import {browserHistory} from "react-router";*/


const param_id = qs.parse(window.location.search);
console.log('log: '+window.location.search);

class SlideUpdateContainer extends React.Component {


    componentDidMount() {
        const url = myConfig.API_URL+'/slides/'+this.props.match.params.id; //формируем ссылку на апи
        console.log(url);
        /*console.log(this.props);*/
        /*Если слайд пустой, то делаем запрос на сервер*/

            console.log('get request');
            axios.get(url)
                .then(res => {
                    this.props.setSlide(res.data);
                    console.log(this.props.slide);
                });

    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setSlide({
            [name]: value
        });
    }


    handleSubmit = event => {
        event.preventDefault();
        let slide = {
            place: this.props.state.place,
            screen_num: this.props.state.screen_num,
            slide_num: this.props.state.slide_num,
            isactive: this.props.state.isactive,
            slide_content: this.props.state.slide_content
        };

        const url = myConfig.API_URL+'/slides/'+param_id.id;
        axios.put(url, { slide })
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
                console.log(slide);
            })
    };

    render() {
        return (
           <SlideUpdate
               handleInputChange={this.handleInputChange}
               handleSubmit={this.handleSubmit}
               slide={this.props.slide}
           />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderUpdateReducer.slide
    }
};

let WithUrlDataContainerComponent = withRouter(SlideUpdateContainer);


export default connect(mapStateToProps, {
    setSlide, slideNewUpdatePlaceInputAC, slideNewUpdateScreenNumInputAC, slideNewUpdateSlideNumInputAC, slideNewUpdateIsActiveInputAC, slideNewUpdateContentInputAC
})(WithUrlDataContainerComponent);