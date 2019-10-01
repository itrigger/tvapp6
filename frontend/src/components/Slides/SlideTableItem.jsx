import React from 'react';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Parser from 'html-react-parser';
import {Button} from "react-bootstrap";
import * as axios from "axios";
import {store} from "react-notifications-component";
/*import * as qs from "query-string";*/


export default class SlideTableItem extends React.Component {


    handleSubmit = event => {
        event.preventDefault();

        axios.delete(`http://localhost:3012/api/slides/`+this.props.id)
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
                <td> {this.props.isactive}</td>
                <td>{Parser(this.props.slide_content)}</td>
                <td>
                    <div className="float-left m-1"><a href={'/slides/update/?id='+this.props.id} className="btn btn-warning"><FontAwesomeIcon
                        icon={faEdit}/></a></div>
                    <form className="slide-delete-form float-left m-1" onSubmit={this.handleSubmit}>
                        <input type="hidden" className="id"/>
                        <Button type="submit" variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                    </form>
                </td>
            </tr>
        )
    }
};
