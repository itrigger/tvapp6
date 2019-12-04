import React from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderField, required} from "../../common/Validator/Validator";

let PlaceUpdateForm = (props) => {

    const {handleSubmit} = props;

    return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Редактирование слайда</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="name" component={renderField} type="text" label={"Название"} placeholder={"zum, mart"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="description" component={renderField} type="text" label={"Описание"} placeholder={""} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="isactive" component={renderField} type="text" label={"Активен (1 или 0)"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Обновить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default PlaceUpdateForm = reduxForm({
    form: 'placeUpdateForm', // a unique identifier for this form
    enableReinitialize : true
})(PlaceUpdateForm)