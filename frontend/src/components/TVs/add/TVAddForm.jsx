import React from 'react';
import 'react-notifications-component/dist/theme.css';
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {renderField, required} from "../../common/Validator/Validator";


let TVAddForm = (props) => {

    const {handleSubmit} = props;

     return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Добавление панели</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={"Название"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="place" component={renderField} type="text" label={"Локация"} placeholder={"zum, mart"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="number" component={renderField} type="text" label={"Номер панели"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="channel" component={renderField} type="text" label={"Номер канала"} placeholder={"channel_1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <label>Шоу</label>
                                <div>
                                <Field name="show" component="select" className="form-control">
                                    {props.shows.map(i => (
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    ))}
                                </Field>
                                </div>
                            </div>
                            <div className="form-group">
                                <Field name="isactive" component={renderField} type="text" label={"Активен (1 или 0)"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Добавить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default TVAddForm = reduxForm({
    form: 'TVAddForm', // a unique identifier for this form
    enableReinitialize : true
})(TVAddForm)