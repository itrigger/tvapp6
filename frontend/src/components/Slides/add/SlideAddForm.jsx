import React from 'react';
import 'react-notifications-component/dist/theme.css';
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {renderField, required} from "../../common/Validator/Validator";


let SlideAddForm = (props) => {

    const {handleSubmit} = props;

     return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Добавление слайда</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field name="place" component={renderField} type="text" label={"Локация"} placeholder={"zum, mart"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="screen_num" component={renderField} type="text" label={"Номер экрана"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="slide_num" component={renderField} type="text" label={"Номер слайда"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="isactive" component={renderField} type="text" label={"Активен (1 или 0)"} placeholder={"1"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="delay" component={renderField} type="text" label={"Время показа"} placeholder={"1000"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="slide_content" component={renderField} type="text" label={"Контент слайда"} placeholder={"<img src='' alt=''/>"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Добавить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SlideAddForm = reduxForm({
    form: 'slideAddForm', // a unique identifier for this form
    enableReinitialize : true
})(SlideAddForm)