import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import PlaceAddForm from "./PlaceAddForm";
import {createPlace} from "../../../redux/reducers/places-reducer";
import {getPlaceSel} from "../../../redux/reducers/places-selector";


class PlaceAddContainer extends React.Component {

    onSubmit = (place) => {
        this.props.createPlace({place});
    };

    render() {
        return (
            <PlaceAddForm onSubmit={this.onSubmit}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        place: getPlaceSel(state)
    }
};


export default compose(
    connect(mapStateToProps, {createPlace}),
    withRouter,
    withAuthRedirect
)(PlaceAddContainer);