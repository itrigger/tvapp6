import React from 'react';
import Parser from "html-react-parser";
import $ from 'jquery';


class Play extends React.Component {
    componentDidMount() {
       this.$el = $(this.el);
        let t;
        let start = this.$el.find('.active').attr('data-interval');
        console.error('start',this.$el);
        t = setTimeout(
            function() {
                this.$el.carousel({interval: 1000})
            }
                .bind(this),
            start - 1000
        );
        t = setTimeout("$('#myCarousel').carousel({interval: 1000});", start-1000);
        this.$el.on('slid.bs.carousel', function () {

            clearTimeout(t);
            let duration = $(this).find('.active').attr('data-interval');

            this.$el.carousel('pause');
            t = setTimeout(
                function() {
                    this.$el.carousel({interval: 1000})
                }
                    .bind(this),
                duration - 1000
            );
        });

    }
    componentWillUnmount() {

    }

    render() {
        const handleClickLeft = (side) =>{
            if(side === 'left'){

            }
        };

        return (
            <div className={"fullscreen"}>
                {this.props.slides.length > 0 ?
                    <div id="myCarousel" className="carousel slide" ref={el => this.el = el}>
                        <div className="carousel-inner">
                            {this.props.slides.map((e,index) =>
                                <div className={index===0?'item active':'item'} data-interval={e.delay}
                                     key={e._id}>{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                            )}
                        </div>

                        {/*<a className="carousel-control left" onClick={() => handleClickLeft('left')} data-slide="prev">&lsaquo;</a>*/}
                        <a className="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                        <a className="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
                    </div>
                    : ""}

            </div>
        )
    }
}

export default Play;