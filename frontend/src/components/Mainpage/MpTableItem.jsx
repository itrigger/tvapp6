import React from 'react';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MpTableItem = (props) => {
    let path = "/play/"+props.id+"?channel="+props.channel;
    return (
        <tr>
            <td> {props.name} </td>
            <td> {props.num}</td>
            <td> {props.channel}</td>
            <td>
                <div className="float-left m-1">
                    <a href={path} className="btn btn-warning"><FontAwesomeIcon icon={faPlay} /></a>
                </div>
            </td>
        </tr>
    )
}

export default MpTableItem;