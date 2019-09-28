import React from 'react';
/*import s from './Header.module.css';*/
import { Button, Navbar, Nav } from 'react-bootstrap';

const Header = (props) =>{
    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="container">
                <div className="float-right p-3 " style={{color: '#fff', marginTop: '5px', marginRight: '20px'}}>
                    Вы вошли как: <b className="px-2">admin</b>
                    <Button href="logout.php" variant="danger" size="sm">Выйти</Button>
                </div>
            </Nav>
        </Navbar>
    )
}

export default Header;