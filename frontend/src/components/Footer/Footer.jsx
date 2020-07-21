import React from 'react';
import s from './Footer.module.css';

const Footer = (props) => {
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className="row">
                    SushiHiro@ 2020
                </div>
            </div>
        </footer>
    )
}

export default Footer;