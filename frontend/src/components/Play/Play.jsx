import React, {Component} from 'react'
import Parser from "html-react-parser"
import Carousel from 'react-elastic-carousel'


class Play extends Component {
    componentDidMount() {

        let carItem = document.getElementsByClassName('item');
        console.log(carItem)
        for (let i = 0; i < carItem.length; i++) {
            console.log(carItem.item(i).innerHTML);
        }
    }

    render() {

 /*       let start = $('#myCarousel').find('.active').attr('data-interval');
        t = setTimeout("$('#myCarousel').carousel({interval: 1000});", start-1000);
        $('#myCarousel').on('slid.bs.carousel', function () {
            console.log('asdfsdf');
            clearTimeout(t);
            let duration = $(this).find('.active').attr('data-interval');

            $('#myCarousel').carousel('pause');
            t = setTimeout("$('#myCarousel').carousel();", duration-1000);
        });*/



        return (
            <div className={"fullscreen"} id={"myCarousel"}>
                {this.props.slides.length > 0 ?
                    <div>
                        <button onClick={() => this.carousel.slideNext()}>Next</button>
                        <hr/>
                        <Carousel itemsToShow={1}
                                  enableAutoPlay
                                  ref={ref => (this.carousel = ref)}
                                  pagination={false}
                                  showArrows={false}
                                  onChange={(currentItem, pageIndex) =>
                                      console.log(pageIndex)
                                  }
                        >
                            {this.props.slides.map((e, index) =>
                                <div key={e._id} className={index === 0 ? 'item active' : 'item'} data-interval={e.delay}
                                >{!e.slide_content || null ? '' : Parser(e.slide_content)}</div>
                            )}
                        </Carousel>
                    </div>
                    : ""}
            </div>
        )
    }
}

export default Play;