import React from 'react';
import 'react-notifications-component/dist/theme.css';
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {
    renderField,
    required
} from "../../common/Validator/Validator";
import 'react-datepicker/dist/react-datepicker.css';
import renderDatePicker from "../../common/Pickers/datepicker";



let ScheduleAddForm = (props) => {

    const {handleSubmit} = props;


     return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Добавление раписания</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                {/*<Field name="starttime" component={renderField} type="text" label={"Дата и время начала"} placeholder={""} validate={[required]}/>*/}

                                <label>Дата и время начала</label>
                                <div>
                                    <Field
                                        name="starttime"
                                        showTime={true}
                                        component={renderDatePicker}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                {/*<Field name="endtime" component={renderField} type="text" label={"Дата и время окончания"} placeholder={""} validate={[required]}/>*/}
                                <label>Дата и время окончания</label>
                                <div>
                                    <Field
                                        name="endtime"
                                        showTime={true}
                                        component={renderDatePicker}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Событие периодично?</label>
                                <div>
                                    <Field name="periodic" component="select" className="form-control">
                                        <option>---Выберите значение из списка---</option>
                                        <option value="false">Нет</option>
                                        <option value="true">Да</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Шоу</label>
                                <div>
                                    <Field name="show" component="select" className="form-control">
                                        <option>---Выберите значение из списка---</option>
                                        {props.shows.map(i => (
                                            <option key={i._id} value={i._id}>{i.name}</option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Экран (канал)</label>
                                <div>
                                    <Field name="channel" component="select" className="form-control">
                                        <option>---Выберите значение из списка---</option>
                                        {props.channels.map(i => (
                                            <option key={i._id} value={i.channel}>{i.name} ({i.channel})</option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Активно?</label>
                                <div>
                                    <Field name="isactive" component="select" className="form-control" >
                                        <option>---Выберите значение из списка---</option>
                                        <option value="1">Да</option>
                                        <option value="0">Нет</option>
                                    </Field>
                                </div>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Добавить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ScheduleAddForm = reduxForm({
    form: 'scheduleAddForm', // a unique identifier for this form
    enableReinitialize : true
})(ScheduleAddForm)