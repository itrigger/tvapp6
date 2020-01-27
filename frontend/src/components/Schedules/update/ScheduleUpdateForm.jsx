import React from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderField, required} from "../../common/Validator/Validator";
import s from "../schedules.module.css";
import Parser from "html-react-parser";

let ScheduleUpdateForm = (props) => {

    const {handleSubmit} = props;

    return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Редактирование расписания</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={"zum, mart"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="starttime" component={renderField} type="text" label={"Дата и время начала"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="endtime" component={renderField} type="text" label={"Дата и время окончания"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="periodic" component={renderField} type="text" label={"Событие периодично?"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="show" component={renderField} type="text" label={"Выберите шоу"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="channel" component={renderField} type="text" label={"Выберите канал"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="isactive" component={renderField} type="text" label={"Активно? (1 или 0)"} placeholder={""} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Обновить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default ScheduleUpdateForm = reduxForm({
    form: 'scheduleUpdateForm', // a unique identifier for this form
    enableReinitialize: true
})(ScheduleUpdateForm)