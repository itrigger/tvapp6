import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import SlideUpdateForm from "./SlideUpdateForm";
import {setSlide} from "../../../redux/reducers/slideUpdate-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {getSlide, putSlide} from "../../../redux/reducers/slide-reducer";
import Preloader from "../../common/Preloader/Preloader";



class SlideUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getSlide(this.props.match.params.id);
    };

    onSubmit = (slide) => {
        this.props.putSlide(this.props.match.params.id, {slide});
    };

    render() {
        if (this.props.isAuth === false) return <Redirect to={"/login"} />;
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <SlideUpdateForm initialValues={this.props.slide}
                             url={this.props.match.params.id}
                             onSubmit={this.onSubmit}
                             isAuth = {this.props.isAuth}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        slide: state.sliderUpdateReducer.slide,
        isAuth: state.authReducer.isAuth
    }
};


let WithUrlDataContainerComponent2 = withRouter(SlideUpdateContainer);

export default connect(mapStateToProps, {setSlide, putSlide, getSlide})(WithUrlDataContainerComponent2);