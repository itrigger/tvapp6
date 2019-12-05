import React from 'react';
import Parser from "html-react-parser";
import OwlCarousel from 'react-owl-carousel2';
import './../../assets/css/owl.css';
import Pusher from 'pusher-js';

const options = {
    items: 1,
    nav: false,
    rewind: true,
    autoplay: true
};

class Play extends React.Component{


    render() {

        return (
            <div className={"fullscreen"}>
                {this.props.slides.length>0?
                    <OwlCarousel options={options}>
                        {this.props.slides.map(e =>
                            <div className="item" key={e._id}>{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                        )}
                    </OwlCarousel>
                    :""}
            </div>
        )
    }
}

export default Play;