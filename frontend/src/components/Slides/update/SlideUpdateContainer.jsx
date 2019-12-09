import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import SlideUpdateForm from "./SlideUpdateForm";
import {withRouter} from "react-router-dom";
import {getSlide, putSlide, setSlide} from "../../../redux/reducers/slide-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getSlideSel} from "../../../redux/reducers/slide-selector";



class SlideUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getSlide(this.props.match.params.id);
    };

    onSubmit = (slide) => {
        this.props.putSlide(this.props.match.params.id, {slide});
    };

    render() {
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
        slide: getSlideSel(state)
    }
};

export default compose(
    connect(mapStateToProps, {setSlide, putSlide, getSlide}),
    withRouter,
    withAuthRedirect
)(SlideUpdateContainer);