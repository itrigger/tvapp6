import React from 'react';
/*import s from './Navbar.module.css'*/
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const MyNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <div className="container">
                <LinkContainer to="/">
                    <Nav.Link href="/" >Главная</Nav.Link>
                </LinkContainer>
                <Nav className="mr-auto">

                    <LinkContainer to="/places">
                        <Nav.Link href="/places" >Точки</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tvss">
                        <Nav.Link href="/tvss">Панели</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/slides">
                        <Nav.Link href="/slides">Слайды</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/shows">
                        <Nav.Link href="/shows">Шоу</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/schedules">
                        <Nav.Link href="/schedules">Расписание</Nav.Link>
                    </LinkContainer>
                </Nav>
            </div>
        </Navbar>
    )
}

export default MyNavbar;