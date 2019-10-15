import React from 'react';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Parser from 'html-react-parser';
import {Button} from "react-bootstrap";
import * as axios from "axios";
import {store} from "react-notifications-component";
import {LinkContainer} from "react-router-bootstrap";
import {myConfig} from "../../config/config";


export default class SlideTableItem extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        const url = myConfig.API_URL + '/slides/' + this.props.id;
        axios.delete(url)
            .then(res => {
                store.addNotification({
                    title: 'TVAPP',
                    message: 'Слайд удален',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-left',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
            })
    };

    render() {
        return (
            <tr>
                <td> {this.props.id} </td>
                <td> {this.props.place} </td>
                <td> {this.props.screen_num}</td>
                <td> {this.props.slide_num}</td>
                <td> {


                    }
                </td>
                {  <td>Parser(this.props.slide_content)</td>}
                <td>{this.props.slide_content}</td>
                <td>
                    <div className="float-left m-1">

                        <LinkContainer to={'/slides/update/?id=' + this.props.id}>
                            <Button variant="warning"><FontAwesomeIcon icon={faEdit}/></Button>
                        </LinkContainer>

                        <a href={'/slides/update/?id=' + this.props.id} className="btn btn-warning"><FontAwesomeIcon
                            icon={faEdit}/></a>
                    </div>
                    <form className="slide-delete-form float-left m-1" onSubmit={this.handleSubmit}>
                        <input type="hidden" className="id"/>
                        <Button type="submit" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                    </form>
                </td>
            </tr>
        )
    }
};
