import React from 'react';
import 'react-notifications-component/dist/theme.css';
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {renderField, required} from "../../common/Validator/Validator";
import Parser from "html-react-parser";
import s from "./../shows.module.css";


let ShowAddForm = (props) => {

    const {handleSubmit} = props;


     return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Добавление шоу</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="slides" component={renderField} type="text" label={"Список слайдов через запятую"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                {props.slides.map(e =>
                                    <span className="item" data-id={e._id} key={e._id} onClick={()=>{props.onClick(e._id)}}><span className={s.smallImg}>{e.slide_content ? Parser(e.slide_content) : ''}</span></span>
                                )}
                            </div>
                            <div className="form-group">
                                <Field name="effect" component={renderField} type="text" label={"Эффект"} placeholder={"fade"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Добавить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ShowAddForm = reduxForm({
    form: 'showAddForm', // a unique identifier for this form
    enableReinitialize : true
})(ShowAddForm)