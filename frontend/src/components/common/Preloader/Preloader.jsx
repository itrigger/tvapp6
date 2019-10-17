import React from 'react';
import loader from '../../../assets/img/loader.svg';
import s from "../../Slides/slides.module.css";

let Preloader = (props) => {
    return (<div className={s.preloader}>
        <img src={loader} alt={'preloader'} className={'preloader'}/>
    </div>)
}

export default Preloader;