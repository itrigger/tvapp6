import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const HeaderAuthFalse = (props) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="container">
                <div className="float-right p-3 " style={{color: '#fff', marginTop: '5px', marginRight: '20px'}}>
                   <LinkContainer to="/login"><Nav.Link href="/login">Войти</Nav.Link></LinkContainer>
                </div>
            </Nav>
        </Navbar>
    )
}

export default HeaderAuthFalse;