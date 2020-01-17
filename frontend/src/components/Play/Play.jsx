import React from 'react';
import Parser from "html-react-parser";
/*import $ from 'jquery';*/
import OwlCarousel from 'react-owl-carousel2';
import './../../assets/css/owl.css';


class Play extends React.Component{


    render() {
        const options = {
            items: 1,
            nav: false,
            rewind: true,
            autoplay: true,
            autoplayTimeout: 3000,
            animateOut: 'fadeOut'
        };

        const events = {
            onTranslated: function () {
               /* console.log('rotateNext');
                console.log($(".owl-item.active .item").data('delay'));
                setTimeout(()=>$(".clicknext").click(),$(".owl-item.active .item").data('delay'));*/
            },
            onInitialized: function () {
                /*console.log('rotateSlide');
                console.log($(".owl-item:first-child .item").data('delay'));
                setTimeout(()=>$(".clicknext").click(),$(".owl-item:first-child .item").data('delay'));*/
            }
        };
        return (
            <div className={"fullscreen"}>
                {this.props.slides.length>0?
                    <OwlCarousel ref="car" options={options} events={events}>
                        {this.props.slides.map(e =>
                            <div className="item" data-delay={e.delay} key={e._id}>{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                        )}
                    </OwlCarousel>
                    :""}
               {/* <button className={"clicknext"} onClick={() => this.refs.car.next()}>Next</button>*/}
            </div>
        )
    }
}

export default Play;