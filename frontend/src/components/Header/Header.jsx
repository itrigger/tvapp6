import React from 'react';
/*import s from './Header.module.css';*/
import {Button, Navbar, Nav} from 'react-bootstrap';
import NavLink from "react-bootstrap/NavLink";
import {LinkContainer} from "react-router-bootstrap";

const Header = (props) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="container">
                <div className="float-right p-3 " style={{color: '#fff', marginTop: '5px', marginRight: '20px'}}>
                    if(props.isAuth){
                        <Button href="/logout" variant="danger" size="sm">Logout</Button>
                    } else {
                    <LinkContainer to="/login"><Nav.Link href="/login">Войти</Nav.Link></LinkContainer>}
                    }

                </div>
            </Nav>
        </Navbar>
    )
}

export default Header;