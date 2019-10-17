import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Parser from "html-react-parser";


let Slides = (props) => {

    let pagesCount = Math.ceil(props.totalSlidesCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

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
                                    <td>{Parser(e.slide_content)}</td>
                                    <td>
                                        <div className="float-left m-1">
                                            <LinkContainer to={'/slides/update/?id=' + e._id}>
                                                <Button variant="warning"><FontAwesomeIcon icon={faEdit}/></Button>
                                            </LinkContainer>
                                        </div>
                                        <form className="slide-delete-form float-left m-1">
                                            <input type="hidden" className="id"/>
                                            <Button type="submit" variant="danger"><FontAwesomeIcon
                                                icon={faTrash}/></Button>
                                        </form>
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                        <div className={"pagination"}>
                            <Pagination>
                                {pages.map(p => {
                                    return <Pagination.Item key={p} active={props.currentPage === p && 'active'}
                                                            onClick={() => {
                                                                props.onPageChanged(p);
                                                            }}
                                    >{p}</Pagination.Item>
                                })}
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Slides;
