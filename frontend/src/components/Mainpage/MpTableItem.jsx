import React from 'react';

const MpTableItem = (props) => {
    let path = "/play/"+props.id+"?place="+props.place+"&num="+props.num+"&channel="+props.channel;
    return (
        <tr>
            <td> {props.id} </td>
            <td> {props.place} </td>
            <td> {props.num}</td>
            <td> {props.channel}</td>
            <td>
                <div className="float-left m-1">
                    <a href={path} className="btn btn-warning"><i className="fas fa-play"></i></a>
                </div>
            </td>
        </tr>
    )
}

export default MpTableItem;