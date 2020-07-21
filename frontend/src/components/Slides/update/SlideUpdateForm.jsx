import React from 'react';
import {Field, reduxForm} from 'redux-form';
/*import {connect} from 'react-redux';*/
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Parser from "html-react-parser";
import {renderField, required} from "../../common/Validator/Validator";

let SlideUpdateForm = (props) => {
    //const {handleSubmit, initialValues, load, pristine, reset, submitting} = props;
    const {handleSubmit} = props;

    /*******************/
    /*Parser for html content*/
   let html = '';
    if (props.initialValues.slide_content && props.initialValues.slide_content !== null) {
        html = Parser(props.initialValues.slide_content)
    }
    /******************/


    return (<section className="container">
            <div className="bs-docs-section clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Редактирование слайда</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                <Field name="type" component={renderField} type="text" label={"Тип содержимого"} placeholder={"image, video, html"} validate={[required]}/>
                            </div>
                            <div className="form-group">
                                <Field name="slide_content" component={renderField} type="text" label={"Контент слайда"} placeholder={"<img src='' alt=''/>"} validate={[required]}/>
                            </div>
                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Сохранить</Button>
                        </form>
                        <div className="slide-preview">
                            {html}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default SlideUpdateForm = reduxForm({
    form: 'slideUpdateForm', // a unique identifier for this form
    enableReinitialize : true
})(SlideUpdateForm)