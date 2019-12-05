import React from 'react';
import {connect} from 'react-redux';
import Play from "./Play";
import {getSlides, setSlides} from "../../redux/reducers/playandupdate";
import Pusher from "pusher-js";
const queryString = require('query-string');

class PlayContainer extends React.Component {

    componentDidMount() {
        const parsedHash = queryString.parse(window.location.search);
        this.props.getSlides(parsedHash.place, parsedHash.num, parsedHash.channel);


        const pusher = new Pusher('715c895bb7ce1e7fa171', {
            cluster: 'ap2',
            forceTLS: true
        });
        const channel = pusher.subscribe(parsedHash.channel);
        channel.bind("my-event", data => {
            console.log(data.message);
            this.props.setSlides(data.message.slides);
        });
        /*this.handleTextChange = this.handleTextChange.bind(this);*/
    }


    render() {
         return <Play
                    slides = {this.props.slides}
                      />
    }
}

let mapStateToProps = (state) => ({
    slides: state.playandupdate.slides
});

export default connect(mapStateToProps, {getSlides, setSlides})(PlayContainer);