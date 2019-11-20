import React from 'react';
import 'react-notifications-component/dist/theme.css';
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


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
                                Локация:<br/>
                                <Field
                                    name="place"
                                    component="input"
                                    type="text"
                                    placeholder="zum, mart"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Номер экрана: <br/>
                                <Field
                                    name="screen_num"
                                    component="input"
                                    type="text"
                                    placeholder="1"
                                    className="form-control"
                                />

                            </div>
                            <div className="form-group">
                                Номер слайда: <br/>
                                <Field
                                    name="slide_num"
                                    component="input"
                                    type="text"
                                    placeholder="1"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Активен (1 или 0): <br/>
                                <Field
                                    name="isactive"
                                    component="input"
                                    type="text"
                                    placeholder="1"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Контент слайда: <br/>
                                <Field
                                    name="slide_content"
                                    component="textarea"
                                    placeholder="<img />"
                                    className="form-control"
                                />
                            </div>

                            <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave}/> Сохранить</Button>
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