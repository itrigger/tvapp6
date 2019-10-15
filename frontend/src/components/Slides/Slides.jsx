import React from 'react';
/*import * as axios from "axios";*/
/*import SlideTableItem from "./SlideTableItem";*/
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
/*import {myConfig} from "../../config/config";*/

const Slides = (props) => {
    /*    state = {
            slides: [],
            id: null
        };*/
    console.log(props.slides);
    if (props.slides.length === 0) {
        props.setSlides(
            {
                _id: '5d806f5e1c9d440000de0f2b1',
                place: "zum",
                slide_num: "1",
                screen_num: "1",
                isactive: true,
                slide_content: "content0000000"
            },
            {
                _id: '5d806f5e1c9d440000de0f2b2',
                place: "zum",
                slide_num: "1",
                screen_num: "1",
                isactive: true,
                slide_content: "content1111111"
            },
            {
                _id: '5d806f5e1c9d440000de0f2b3',
                place: "zum",
                slide_num: "1",
                screen_num: "1",
                isactive: false,
                slide_content: "content2222222"
            }
        )
    }


    /*  componentDidMount() {
         //this.setState({slides: this.props.slides});
           /!* const url = myConfig.API_URL+'/slides';
            axios.get(url)
                .then(res => {
                    const slides = res.data;
                    this.setState({slides});
                })*!/

        }*/


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
                                    <Button variant="success"><FontAwesomeIcon icon={faPlus}/> Добавить новый
                                        слайд</Button>
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
                            {props.slides.map(e =>
                                <tr key={e._id}>
                                    <td>{e._id}</td>
                                    <td>{e.place}</td>
                                    <td>{e.screen_num}</td>
                                    <td>{e.slide_num}</td>
                                    <td>{
                                        e.isactive
                                            ? <button onClick={() => {
                                                props.activeOff(e._id)
                                            }}>Active on</button>
                                            : <button onClick={() => {
                                                props.activeOn(e._id)
                                            }}>Active off</button>
                                    }</td>
                                    <td>{e.slide_content}</td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default Slides;