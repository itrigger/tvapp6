import React from 'react';
import * as axios from "axios";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as qs from 'query-string';
import {myConfig} from "../../config/config";
import {browserHistory} from "react-router";





const param_id = qs.parse(window.location.search);
console.log('log: '+window.location.search);

export default class SlideUpdate extends React.Component {

    state = {
        cur_slide: [],
        id: null
    };

    componentDidMount() {

        const url = myConfig.API_URL+'/slides/'+param_id.id;
        axios.get(url)
            .then(res => {
                const cur_slide = res.data;
                this.setState({cur_slide});
                this.setState({ place: this.state.cur_slide.place }); /*значениея по умолчанию для полей берем из базы по ИД слайда*/
                this.setState({ screen_num: this.state.cur_slide.screen_num });
                this.setState({ slide_num: this.state.cur_slide.slide_num });
                this.setState({ isactive: this.state.cur_slide.isactive });
                this.setState({ slide_content: this.state.cur_slide.slide_content });
            });
    }

    constructor(props) {
        super(props);
        this.state.slide_content =  this.state.cur_slide.slide_content;
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit = event => {
        event.preventDefault();
        let slide = {
            place: this.state.place,
            screen_num: this.state.screen_num,
            slide_num: this.state.slide_num,
            isactive: this.state.isactive,
            slide_content: this.state.slide_content
        };

            const url = myConfig.API_URL+'/slides/'+param_id.id;
            axios.put(url, { slide })
            .then(res => {
                store.addNotification({
                    title: 'TVAPP',
                    message: 'Слайд обновлен',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-left',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
                console.log(slide);
            })
    };

    render() {
        return (
            <section className="container">
                <div className="bs-docs-section clearfix">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Редактирование слайда</h1>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    Локация:<br />
                                    <input type='text' name='place' className='form-control fu-place' defaultValue={this.state.cur_slide.place} onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Номер экрана: <br />
                                    <input type='text' name='screen_num' className='form-control' defaultValue={this.state.cur_slide.screen_num} onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Номер слайда: <br />
                                    <input type='text' name='slide_num' className='form-control' defaultValue={this.state.cur_slide.slide_num} onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Активен (1 или 0): <br />
                                    <input type='text' name='isactive' className='form-control' defaultValue={this.state.cur_slide.isactive} onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Контент слайда: <br />
                                    <textarea name='slide_content' className='form-control' value={this.state.slide_content} onChange={this.handleInputChange} />
                                </div>
                                <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave} /> Сохранить</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
