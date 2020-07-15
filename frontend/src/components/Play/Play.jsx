import React, {Component} from 'react'
import Parser from "html-react-parser"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Play extends Component {
    /*function which toggle next slide by interval receiving from data attr*/
    nextSlideByTimer = (current) => {
        let t;
        let start = this.slider.props.children[current].props["data-interval"];
        this.slider.slickPause();
        clearTimeout(t);
        t = setTimeout(() => {
            /*need stop timeout when unmount component, dont know how, this is my solution*/
            if (this.slider != null) {
                this.slider.slickNext()
            } else {
                clearTimeout(t);
            }
        }, start);
    };

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
                                >{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                            )}
                        </Slider>
                    </div>
                    : ""}
            </div>

        )
    }
}

export default Play;