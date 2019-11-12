import React from 'react';
import {Button, Navbar, Nav} from 'react-bootstrap';
import NavLink from "react-bootstrap/NavLink";
import {LinkContainer} from "react-router-bootstrap";

const HeaderAuthTrue = (props) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="container">
                <div className="float-right p-3 " style={{color: '#fff', marginTop: '5px', marginRight: '20px'}}>
                  Привет, {props.name}  <Button href="/logout" variant="danger" size="sm">Выйти</Button>
                </div>
            </Nav>
        </Navbar>
    )
}

export default HeaderAuthTrue;