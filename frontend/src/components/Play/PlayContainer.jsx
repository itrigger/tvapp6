import React from 'react';
import {connect} from 'react-redux';
import Play from "./Play";
import {getSlides} from "../../redux/reducers/playandupdate";


class PlayContainer extends React.Component {

    componentDidMount() {
        this.props.getSlides('zum', '1', 'zum-channe1');
    }


    render() {
         return <Play {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    slides: state.playandupdate.slides
});

export default connect(mapStateToProps, {getSlides})(PlayContainer);