import React, {Component} from 'react'
import Parser from "html-react-parser"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactAwesomePlayer from 'react-awesome-player'
import ReactPlayer from 'react-player'
//https://video-react.js.org/
//https://react-slick.neostack.com/docs/api/

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            url: null,
            pip: false,
            playing: false,
            controls: false,
            light: false,
            volume: 0,
            muted: true,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.ended = this.ended.bind(this);
    }

    /*function which toggle next slide by interval receiving from data attr*/
    nextSlideByTimer = (current) => {
        let t;
        let start = this.slider.props.children[current].props["data-interval"];
        let type = this.slider.props.children[current].props["data-type"];
        this.slider.slickPause();
        clearTimeout(t);

        if (type === 'video') {
            this.handlePlay()
        } else {
            t = setTimeout(() => {
                /*need to stop timeout when unmount component, dont know how, this is my solution*/
                if (this.slider != null) {
                    this.slider.slickNext()
                } else {
                    clearTimeout(t);
                }
            }, start);
        }

    };
    handlePlay = () => {
        this.setState({
            playing: true,
            loop: false
        })
    }
    ended = () => {
        this.setState({
            playing: false,
            loop: true
        })
       this.slider.slickNext()
    }
    ref = player => {
        this.player = player
    }
    render() {

        const settings = {
            dots: false,
            arrows: false,
            pauseOnHover: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            afterChange: (current) => this.nextSlideByTimer(current)
        };

         return (
            <div className={"fullscreen"} id={"myCarousel"}>
                {this.props.slides.length > 0 ?
                    <div>
                        <Slider
                            ref={c => (this.slider = c)}
                            {...settings}
                        >
                            {this.props.slides.map((e, index) =>
                                <div key={e._id} className={index === 0 ? 'item active' : 'item'}
                                     data-interval={e.delay}
                                     data-type={e.type}
                                >
                                    {(() => {
                                        switch (e.type) {
                                            case "image":   return Parser(e.slide_content);
                                            case "html":    return Parser(e.slide_content);
                                            case "video":   return <ReactPlayer
                                                ref={this.ref}
                                                onEnded = {this.ended}
                                                playing={this.state.playing}
                                                url={e.slide_content}
                                                height= {"100%"}
                                                width= {"100%"}
                                            />;
                                            default:        return Parser(e.slide_content);
                                        }
                                    })()}
                                </div>
                            )}
                        </Slider>
                    </div>
                    : ""}
            </div>

        )
    }
}

export default Play;