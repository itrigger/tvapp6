import React from 'react';
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

const MpTableItem = (props) => {
    let path = "/play/" + props.id + "?channel=" + props.channel;
    return (
        <tr>
            <td> {props.name} </td>
            <td> {props.num}</td>
            <td> {props.channel}</td>
            <td>
                <div className="float-left m-1">
                    <LinkContainer to={path}>
                        <Button className="btn btn-warning"><FontAwesomeIcon icon={faPlay}/></Button>
                    </LinkContainer>
                </div>
            </td>
        </tr>
    );
};

export default MpTableItem;