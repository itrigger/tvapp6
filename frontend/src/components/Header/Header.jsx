import React from 'react';
import s from './Header.module.css'
import { Button, Navbar, Nav } from 'react-bootstrap';

const Header = (props) =>{
    return (
        <Navbar  bg="dark" variant="dark">
            <Nav className="container">
                <div className="float-right" style={{color: '#fff', marginTop: '5px', marginRight: '20px'}}>
                    Вы вошли как: <b>admin</b>
                    <Button href="logout.php" variant="danger">Выйти</Button>
                </div>
            </Nav>
        </Navbar>
    )
}

export default Header;