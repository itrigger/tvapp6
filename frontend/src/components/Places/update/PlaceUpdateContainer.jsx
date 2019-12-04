import React from 'react';
import 'react-notifications-component/dist/theme.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getPlaceSel} from "../../../redux/reducers/places-selector";
import {getPlace, putPlace, setPlace} from "../../../redux/reducers/places-reducer";
import PlaceUpdateForm from "./PlaceUpdateForm";




class PlaceUpdateContainer extends React.Component {

    componentDidMount() {
        this.props.getPlace(this.props.match.params.id);
    };

    onSubmit = (place) => {
        this.props.putPlace(this.props.match.params.id, {place});
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <PlaceUpdateForm initialValues={this.props.place}
                             url={this.props.match.params.id}
                             onSubmit={this.onSubmit}
                             isAuth = {this.props.isAuth}
            />
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        place: getPlaceSel(state)
    }
};

export default compose(
    connect(mapStateToProps, {setPlace, putPlace, getPlace}),
    withRouter,
    withAuthRedirect
)(PlaceUpdateContainer);