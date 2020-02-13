import React from 'react';
import Parser from "html-react-parser";
import $ from 'jquery';




class Play extends React.Component {

    render() {
        let t;

        let start = $('#myCarousel').find('.active').attr('data-interval');
        t = setTimeout("$('#myCarousel').carousel({interval: 1000});", start-1000);
        $('#myCarousel').on('slid.bs.carousel', function () {
            console.log('asdfsdf');
            clearTimeout(t);
            let duration = $(this).find('.active').attr('data-interval');

            $('#myCarousel').carousel('pause');
            t = setTimeout("$('#myCarousel').carousel();", duration-1000);
        });

        return (
            <div className={"fullscreen"}>
                {this.props.slides.length > 0 ?
                    <div id="myCarousel" className="carousel slide">
                        <div className="carousel-inner">
                            {this.props.slides.map(e =>
                                <div className="item" data-interval={e.delay}
                                     key={e._id}>{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                            )}
                        </div>

                        <a className="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                        <a className="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
                    </div>
                    : ""}

            </div>
        )
    }
}

export default Play;