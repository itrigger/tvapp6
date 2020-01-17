import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import ShowAddForm from "./ShowAddForm";
import {createShow} from "../../../redux/reducers/show-reducer";
import {getShowSel} from "../../../redux/reducers/show-selector";
import {getSlides} from "../../../redux/reducers/slide-reducer";
import {getSlidesSortedSel} from "../../../redux/reducers/slide-selector";
import $ from "jquery";
import {change} from "redux-form";

class ShowAddContainer extends React.Component {

    componentDidMount() {
        this.props.getSlides(1,1000);
    };

    imgClick = (id) => {
        let changedID = $('input[name=slides]').val() + id.replace(/\s+/g,'') + ';';
        this.props.change('showAddForm','slides',changedID);
    };

    onSubmit = (show) => {
        this.props.createShow({show});
    };

    render() {
        return (
            <ShowAddForm slides={this.props.slides} onClick={this.imgClick} onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        show: getShowSel(state),
        slides: getSlidesSortedSel(state),
    }
};
const mapDispatchToProps = {
    change,
    createShow,
    getSlides
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ShowAddContainer);