import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {createSlide} from "../../../redux/reducers/slide-reducer";
import {withRouter} from "react-router-dom";
import TVAddForm from "./TVAddForm";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getSlideSel} from "../../../redux/reducers/slide-selector";


class TVAddContainer extends React.Component {

    onSubmit = (slide) => {
        this.props.createSlide({slide});
    };

    render() {
        return (
            <TVAddForm onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        slide: getSlideSel(state)
    }
};


export default compose(
    connect(mapStateToProps, {createSlide}),
    withRouter,
    withAuthRedirect
)(TVAddContainer);