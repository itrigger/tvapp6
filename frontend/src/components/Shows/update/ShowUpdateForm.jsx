import React from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderField, required} from "../../common/Validator/Validator";
import s from "../shows.module.css";
import Parser from "html-react-parser";

let ShowUpdateForm = (props) => {

    const {handleSubmit} = props;

    return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Редактирование шоу</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"}
                                       placeholder={"zum, mart"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"}
                                       placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="slides" component={renderField} type="text"
                                       label={"Список слайдов через запятую"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                {props.formValues ?
                                    props.slides.map(i => (
                                            <span
                                                className={props.formValues.split(';').find(item => item === i._id) ? s.active : null}
                                                data-id={i._id} key={i._id} onClick={() => {
                                                props.onClick(i._id)
                                            }}><span
                                                className={s.smallImg}>{i.slide_content ? Parser(i.slide_content) : ''}</span></span>
                                        )
                                    ) : props.slides.map(i => (
                                            <span data-id={i._id} key={i._id} onClick={() => {
                                                props.onClick(i._id)
                                            }}><span
                                                className={s.smallImg}>{i.slide_content ? Parser(i.slide_content) : ''}</span></span>
                                        )
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <Field name="effect" component={renderField} type="text" label={"Эффект перехода"}
                                       placeholder={"1"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Обновить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default ShowUpdateForm = reduxForm({
    form: 'showUpdateForm', // a unique identifier for this form
    enableReinitialize: true
})(ShowUpdateForm)