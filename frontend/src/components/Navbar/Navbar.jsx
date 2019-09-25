import React from 'react';
import s from './Navbar.module.css'
import {Navbar, Nav} from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
        <Navbar bg="dark" variant="dark">
            <div className="container">
                <Navbar.Brand href="/">Главная</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/places">Точки</Nav.Link>
                    <Nav.Link href="/tvss">Панели</Nav.Link>
                    <Nav.Link href="/slides">Слайды</Nav.Link>
                    <Nav.Link href="/schedule">События</Nav.Link>
                </Nav>
            </div>
        </Navbar>
    )
}

export default MyNavbar;