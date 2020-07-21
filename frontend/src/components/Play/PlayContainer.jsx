import React from 'react';
import {connect} from 'react-redux';
import Play from "./Play";
import {getSlides, getSlidesByID, setSlides} from "../../redux/reducers/playandupdate";
import Pusher from "pusher-js";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Places from "../Places/Places";
const queryString = require('query-string');

class PlayContainer extends React.Component {

    componentDidMount() {
        const parsedHash = queryString.parse(window.location.search);
        this.props.getSlides(parsedHash.channel);

        const pusher = new Pusher('715c895bb7ce1e7fa171', {
            cluster: 'ap2',
            forceTLS: true
        });
        const channel = pusher.subscribe(parsedHash.channel);
        channel.bind("my-event", data => {
            this.props.getSlidesByID(data.message.show);
        });
    }


    render() {
         return <Play slides = {this.props.slides} />
    }
}

let mapStateToProps = (state) => ({
    slides: state.playandupdate.slides
});

export default compose(
    connect(mapStateToProps,  {getSlides, getSlidesByID, setSlides}),
    withRouter,
    withAuthRedirect
)(PlayContainer);