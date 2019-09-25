import React from 'react';
import MpTableItem from "./MpTableItem";


const Mainpage = (props) => {
    debugger;

    let elements = props.tvs.map(e => <MpTableItem key={e.id} id={e.id} place={e.place} num={e.num} channel={e.channel}/>);
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
                                <th>Id</th>
                                <th>Локация</th>
                                <th>Номер</th>
                                <th>Канал</th>
                                <th></th>
                            </tr>
                                {elements}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Mainpage;