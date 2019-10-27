import React from 'react';
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


let SlideUpdate = (props) => {

        return (
            <section className="container">
                <div className="bs-docs-section clearfix">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Редактирование слайда</h1>
                            </div>

                            <form onSubmit={props.handleSubmit}>
                                <div className="form-group">
                                    Локация:<br />
                                    <input type='text' name='slideUpdatePlaceInput' className='form-control fu-place' defaultValue={props.slide.place} onChange={props.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Номер экрана: <br />
                                    <input type='text' name='slideUpdateScreenNumInput' className='form-control' defaultValue={props.slide.screen_num} onChange={props.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Номер слайда: <br />
                                    <input type='text' name='slideUpdateSlideNumInput' className='form-control' defaultValue={props.slide.slide_num} onChange={props.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Активен (1 или 0): <br />
                                    <input type='text' name='slideUpdateIsActiveInput' className='form-control' defaultValue={props.slide.isactive} onChange={props.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    Контент слайда: <br />
                                    <textarea name='slideUpdateSlideContentInput' className='form-control' value={props.slide.slide_content} onChange={props.handleInputChange} />
                                </div>
                                <Button type="submit" variant="success"><FontAwesomeIcon icon={faSave} /> Сохранить</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )

}

export default SlideUpdate;