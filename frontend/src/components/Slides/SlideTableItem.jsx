import React from 'react';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Parser from 'html-react-parser';
import {Button} from "react-bootstrap";

const SlideTableItem = (props) => {
    let path = "/slides/update/?id="+props.id;
    return (
        <tr>
            <td> {props.id} </td>
            <td> {props.place} </td>
            <td> {props.screen_num}</td>
            <td> {props.slide_num}</td>
            <td> {props.isactive}</td>
            <td>{Parser(props.slide_content)}</td>
            <td>
                <div className="float-left m-1"><a href={path} className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></a></div>
                <form className="slide-delete-form float-left m-1">
                    <input type="hidden" className="id" value={props.id} />
                        <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                </form>
            </td>
        </tr>
    )
};

export default SlideTableItem;