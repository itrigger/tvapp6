import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

let Schedule = (props) => {

    let pagesCount = Math.ceil(props.totalSchedulesCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const handleDelete = (id) => {
        props.deleteSchedule(id)
    };

    return (
        <section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Расписание</h1>
                        </div>
                        <div className="card mb-5">
                            <div className="card-body">
                                <LinkContainer to="/schedule/add">
                                    <Button variant="success"><FontAwesomeIcon icon={faPlus}/> Добавить новое расписание</Button>
                                </LinkContainer>
                            </div>
                        </div>
                        <table className='table table-striped table-dark'>
                            <tbody>
                            <tr>
                                <th>Название</th>

                                <th>Дата и время начала</th>
                                <th>Дата и время окончания</th>
                                <th>Периодично?</th>
                                <th>Шоу</th>
                                <th>Канал экрана</th>
                                <th>Активно?</th>
                                <th></th>
                            </tr>
                            {props.schedules.map(e =>
                                <tr key={e._id}>
                                    <td>{e.name}<br/>
                                        <small>{e.description}</small>
                                    </td>

                                    <td>{e.starttime}</td>
                                    <td>{e.endtime}</td>
                                    <td>{e.periodic}</td>
                                    <td>{e.show}</td>
                                    <td>{e.channel}</td>
                                    <td>{e.isactive}</td>
                                    <td>
                                        <div className="float-left m-1 mw114">
                                            <LinkContainer to={'/schedule/update/' + e._id}>
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

export default Schedule;
