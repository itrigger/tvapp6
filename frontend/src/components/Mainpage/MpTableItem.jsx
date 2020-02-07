import React from 'react';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


const MpTableItem = (props) => {
    let path = "/play/"+props.id+"?channel="+props.channel;
    return (
        <tr>
            <td> {props.name} </td>
            <td> {props.num}</td>
            <td> {props.channel}</td>
            <td>
                <div className="float-left m-1">
                    <LinkContainer to={path}><a className="btn btn-warning"><FontAwesomeIcon icon={faPlay} /></a></LinkContainer>
                </div>
            </td>
        </tr>
    )
}

export default MpTableItem;