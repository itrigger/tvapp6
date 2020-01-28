import React, { useState } from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderField, required} from "../../common/Validator/Validator";
import DatePicker from "react-datepicker";
import moment from "moment";

let ScheduleUpdateForm = (props) => {

    const {handleSubmit} = props;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Редактирование расписания</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <label>Дата и время начала</label>
                                <div>
                                    <DatePicker
                                        name="starttime"
                                        className="form-control"
                                        selected={props.initialValues.starttime ? moment(props.initialValues.starttime, 'yyyyMMddHHmm'): null}
                                        onChange={date => setStartDate(date)}
                                        timeInputLabel="Время:"
                                        dateFormat="yyyyMMddHHmm"
                                        showTimeInput
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Дата и время окончания</label>
                                <div>
                                    <DatePicker
                                        name="endtime"
                                        className="form-control"
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        timeInputLabel="Время:"
                                        dateFormat="yyyyMMddHHmm"
                                        showTimeInput
                                    />
                                </div>
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