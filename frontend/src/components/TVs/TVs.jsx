import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";


let TVs = (props) => {

    let pagesCount = Math.ceil(props.totalSlidesCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const handleDelete = (id) => {props.deleteTV(id)};
    const handleReload = (place, number, channel) => {props.reloadTV(place, number, channel)};

    return (
        <section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>ТВ Панели</h1>
                        </div>
                        <div className="card mb-5">
                            <div className="card-body">
                                <LinkContainer to="/tvs/add">
                                    <Button variant="success"><FontAwesomeIcon icon={faPlus}/> Добавить новую панель</Button>
                                </LinkContainer>
                            </div>
                        </div>
                        <table className='table table-striped mytable table-dark'>
                            <tbody>
                            <tr>
                                <th>Локация</th>
                                <th>Экран</th>
                                <th>Номер канала</th>
                                <th>Шоу</th>
                                <th>Активен?</th>
                                <th></th>
                            </tr>
                            {props.tvs.map(e =>
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.place}</td>
                                    <td>{e.number}</td>
                                    <td>{e.channel}</td>
                                    <td>{
                                            props.showName.map(i => (i._id === e.show ? i.name : null))
                                        }
                                    </td>
                                    <td>{
                                        e.isactive === '1'
                                            ? <button disabled={props.isTVsUpdating.some(id => id === e._id) } onClick={() => {
                                                let tv = {place: e.place,number: e.number,channel: e.channel,show: e.show,isactive: '0'}
                                                props.putTVActive(e._id, tv, true);
                                            }}>Выключить</button>

                                            : <button disabled={props.isTVsUpdating.some(id => id === e._id)} onClick={() => {
                                                let tv = {place: e.place,number: e.number,channel: e.channel,show: e.show,isactive: '1'}
                                                props.putTVActive(e._id, tv, false);
                                            }}>Включить</button>

                                    }</td>
                                    <td>
                                        <div className="float-left m-1">
                                            <LinkContainer to={'/tvs/update/' + e._id}>
                                                <Button variant="warning"><FontAwesomeIcon icon={faEdit}/></Button>
                                            </LinkContainer>&nbsp;&nbsp;&nbsp;
                                            <Button variant="danger" onClick={() => window.confirm("Удалить панель?") && handleDelete(e._id)}><FontAwesomeIcon icon={faTrash}/></Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="danger" onClick={() => window.confirm("Перезагрузить панель?") && handleReload(e.place, e.number, e.channel)}><FontAwesomeIcon icon={faPlay}/></Button>
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

export default TVs;
