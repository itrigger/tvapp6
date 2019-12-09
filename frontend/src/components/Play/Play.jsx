import React, { useState } from 'react';
import Parser from "html-react-parser";
import OwlCarousel from 'react-owl-carousel2';
import './../../assets/css/owl.css';
import $ from 'jquery';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';


const Play =(props)=>{


        const [swiper, updateSwiper] = useState(null);

        const goNext = () => {
            if (swiper !== null) {
                swiper.slideNext();
            }
        };

        const goPrev = () => {
            if (swiper !== null) {
                swiper.slidePrev();
            }
        };


    const params = {
        Swiper,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        loop: true,
        observer: true,
        on: {
            init: function () {
                console.log('init');
               setTimeout(Swiper.slideNext(),$(".swiper-slide-active").data('delay'));
            },
            slideChange: function () {
                console.log('rotateSlide');
            }
        },
    }


        /*

        const events = {
            onTranslated: function () {
                console.log('rotateNext');
                console.log($(".owl-item.active .item").data('delay'));
                setTimeout(()=>$(".clicknext").click(),$(".owl-item.active .item").data('delay'));
            },
            onInitialized: function () {
                clearTimeout(startedTO);
                clearTimeout(intervalTO);
                console.log('rotateSlide');
                console.log($(".owl-item:first-child .item").data('delay'));
                setTimeout(()=>$(".clicknext").click(),$(".owl-item:first-child .item").data('delay'));
            }
        };
*/


        return (
            <div className={"fullscreen"}>
                {props.slides.length>0?
                    <Swiper {...params}>
                        {props.slides.map(e =>
                            <div className="item" data-delay={e.delay} key={e._id}>{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                        )}
                    </Swiper>
                    :""}
                <button onClick={goPrev}>Prev</button>
                <button onClick={goNext}>Next</button>
            </div>
        )

}

export default Play;