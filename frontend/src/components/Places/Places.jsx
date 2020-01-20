import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";


let Places = (props) => {

    let pagesCount = Math.ceil(props.totalPlacesCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const handleDelete = (id) => {props.deletePlace(id)};

    return (
        <section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Точки</h1>
                        </div>
                        <div className="card mb-5">
                            <div className="card-body">
                                <LinkContainer to="/places/add">
                                    <Button variant="success"><FontAwesomeIcon icon={faPlus}/> Добавить новую точку</Button>
                                </LinkContainer>
                            </div>
                        </div>
                        <table className='table table-striped mytable table-dark'>
                            <tbody>
                            <tr>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Активен?</th>
                                <th></th>
                            </tr>
                            {props.places.map(e =>
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>{
                                        e.isactive === '1'

                                            ? <button disabled={props.isPlacesUpdating.some(id => id === e._id) } onClick={() => {
                                                let place = {name: e.name,description: e.description,isactive: '0'}
                                                props.putPlaceActive(e._id, place, true);
                                            }}>Выключить</button>

                                            : <button disabled={props.isPlacesUpdating.some(id => id === e._id)} onClick={() => {
                                                let place = {name: e.name,description: e.description,isactive: '1'}
                                                props.putPlaceActive(e._id, place, false);
                                            }}>Включить</button>

                                    }</td>

                                    <td>
                                        <div className="float-left m-1">
                                            <LinkContainer to={'/places/update/' + e._id}>
                                                <Button variant="warning"><FontAwesomeIcon icon={faEdit}/></Button>
                                            </LinkContainer>&nbsp;&nbsp;&nbsp;
                                            <Button variant="danger" onClick={() => window.confirm("Удалить точку?") && handleDelete(e._id)}><FontAwesomeIcon icon={faTrash}/></Button>
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

export default Places;
