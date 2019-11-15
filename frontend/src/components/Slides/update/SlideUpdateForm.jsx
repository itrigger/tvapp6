import React from 'react';
import {Field, reduxForm} from 'redux-form';
/*import {connect} from 'react-redux';*/
import 'react-notifications-component/dist/theme.css';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Parser from "html-react-parser";
/*import {loadAC} from "../../../redux/reducers/slideUpdate-reducer";*/


let SlideUpdateForm = (props) => {
    //const {handleSubmit, initialValues, load, pristine, reset, submitting} = props;
    const {handleSubmit} = props;

    /*******************/
    /*Parser for html content*/
   let html = '';
    if (props.initialValues.slide_content) {
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
                                Локация:<br/>
                                <Field
                                    name="place"
                                    component="input"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Номер экрана: <br/>
                                <Field
                                    name="screen_num"
                                    component="input"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                />

                            </div>
                            <div className="form-group">
                                Номер слайда: <br/>
                                <Field
                                    name="slide_num"
                                    component="input"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Активен (1 или 0): <br/>
                                <Field
                                    name="isactive"
                                    component="input"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Контент слайда: <br/>
                                <Field
                                    name="slide_content"
                                    component="textarea"
                                    placeholder=""
                                    className="form-control"
                                />
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