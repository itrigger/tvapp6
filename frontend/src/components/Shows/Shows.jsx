import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import s from "./shows.module.css";
import Parser from "html-react-parser";


let Shows = (props) => {

    let pagesCount = Math.ceil(props.totalShowsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const handleDelete = (id) => {
        props.deleteShow(id)
    };

    return (
        <section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Шоу</h1>
                        </div>
                        <div className="card mb-5">
                            <div className="card-body">
                                <LinkContainer to="/show/add">
                                    <Button variant="success"><FontAwesomeIcon icon={faPlus}/> Добавить новое
                                        шоу</Button>
                                </LinkContainer>
                            </div>
                        </div>
                        <table className='table table-striped mytable table-dark'>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Список слайдов</th>
                                <th>Эффект перехода</th>
                                <th></th>
                            </tr>
                            {props.shows.map(e =>
                                <tr key={e._id}>
                                    <td>{e._id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>
                                        {e.slides.split(';').map(z =>
                                             props.slides.map(i => (
                                                  z === i._id ? <span className="item" data-id={i._id} key={i._id}><span className={s.smallImg}>{i.slide_content ? Parser(i.slide_content) : ''}</span></span> : ''
                                                    )
                                                )
                                            )
                                        }
                                    </td>
                                    <td>{e.effect}</td>
                                    <td>
                                        <div className="float-left m-1">
                                            <LinkContainer to={'/show/update/' + e._id}>
                                                <Button variant="warning"><FontAwesomeIcon icon={faEdit}/></Button>
                                            </LinkContainer>&nbsp;&nbsp;&nbsp;
                                            <Button variant="danger"
                                                    onClick={() => window.confirm("Удалить шоу?") && handleDelete(e._id)}><FontAwesomeIcon
                                                icon={faTrash}/></Button>
                                        </div>

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

export default Shows;
