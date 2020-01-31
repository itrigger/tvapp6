import React from 'react';
import MpTableItem from "./MpTableItem";
import {Pagination} from "react-bootstrap";


let Mainpage = (props) => {
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
                                <h1>Главная страница</h1>
                            </div>
                            <table className='table table-striped table-dark'>
                                <tbody>
                                <tr>
                                    <th>Локация</th>
                                    <th>Номер ТВ</th>
                                    <th>Канал</th>
                                    <th>Запустить</th>
                                </tr>
                                { props.tvs.map(e => <MpTableItem key={e._id} id={e._id} place={e.place} num={e.number} name={e.name} channel={e.channel} isactive={e.isactive}/>)}
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
};

export default Mainpage;