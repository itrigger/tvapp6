import React from 'react';
import MpTableItem from "./MpTableItem";
import * as axios from "axios";
/*import state from "../../redux/state";*/



export default class Mainpage extends React.Component {
    state = {
        tvs: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3012/api/tvs/all`)
            .then(res => {
                const tvs = res.data;
                this.setState({ tvs });
            })
    }

    render() {
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
                                { this.state.tvs.map(e => <MpTableItem key={e._id} id={e._id} place={e.place} num={e.number} channel={e.channel} isactive={e.isactive}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

/*

const Mainpage = () => {

    let state = {
        tvs: []
    }

    componentDidMount()
    {
        axios.get(`http://localhost:3012/api/tvs/all`)
            .then(res => {
                const tvs = res.data;
                this.setState({ tvs });
            })
    }

      /!* axios.get("http://localhost:3012/api/tvs/all").then(response => {
           debugger;
           state = response.data;
           console.log('state is: '+state);

       });*!/

    let elements = this.state.tvs.map(e => <MpTableItem key={e._id} id={e._id} place={e.place} num={e.number} channel={e.channel} isactive={e.isactive}/>);

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

export default Mainpage;*/
