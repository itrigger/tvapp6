import React from 'react';
import * as axios from "axios";
import SlideTableItem from "./SlideTableItem";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";
import {Button} from "react-bootstrap";

export default class Slides extends React.Component {
    state = {
        slides: []
    };

    componentDidMount() {
        axios.get(`http://localhost:3012/api/slides/`)
            .then(res => {
                const slides = res.data;
                this.setState({slides});
            })
    }

    render() {
        return (
            <section className="container">
                <div className="bs-docs-section clearfix">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Слайды</h1>
                            </div>
                            <div className="card mb-5">
                                <div className="card-body">
                                    <LinkContainer to="/slides/add">
                                        <Button variant="success"><FontAwesomeIcon icon={faPlus} /> Добавить новый слайд</Button>
                                    </LinkContainer>
                                </div>
                            </div>
                            <table className='table table-striped mytable table-dark'>
                                <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Локация</th>
                                    <th>Экран</th>
                                    <th>Номер слайда</th>
                                    <th>Активен?</th>
                                    <th>Контент</th>
                                    <th></th>
                                </tr>
                                {this.state.slides.map(e => <SlideTableItem key={e._id}
                                                                            id={e._id}
                                                                            place={e.place}
                                                                            screen_num={e.screen_num}
                                                                            slide_num={e.slide_num}
                                                                            isactive={e.isactive}
                                                                            slide_content={e.slide_content}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}