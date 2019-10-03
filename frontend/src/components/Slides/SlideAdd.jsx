import React from 'react';
import * as axios from "axios";
/*import state from "../../redux/state";*/
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import state from "../../redux/state";


/*export default class SlideAdd extends React.Component {*/
const SlideAdd = (props) => {
    // state = {
    //     place: '',
    //     screen_num: '',
    //     slide_num:'',
    //     isactive:'',
    //     slide_content: ''
    // };
    //
    // handleChangePlace = event => {this.setState({ place: event.target.value });};
    // handleChangeScreenNum = event => {this.setState({ screen_num: event.target.value });};
    // handleChangeSlideNum = event => {this.setState({ slide_num: event.target.value });};
    // handleChangeIsActive = event => {this.setState({ isactive: event.target.value });};
    // handleChangeContent = event => {this.setState({ slide_content: event.target.value });};
    //
    // handleSubmit = event => {
    //     event.preventDefault();
    //
    //     const slide = {
    //         place: this.state.place,
    //         screen_num: this.state.screen_num,
    //         slide_num: this.state.slide_num,
    //         isactive: this.state.isactive,
    //         slide_content: this.state.slide_content
    //     };
    //
    //     axios.post(`http://localhost:3012/api/slides/`, { slide })
    //         .then(res => {
    //             store.addNotification({
    //                 title: 'TVAPP',
    //                 message: 'Слайд добавлен',
    //                 type: 'success',                         // 'default', 'success', 'info', 'warning'
    //                 container: 'bottom-left',                // where to position the notifications
    //                 animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
    //                 animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
    //                 dismiss: {
    //                     duration: 3000
    //                 }
    //             })
    //         })
    // };

    let newPostElement = React.createRef();
    let addPost = () =>{
        debugger;
        let text = newPostElement.current.value;
        props.addPost(text);
    };


    /*render() {*/
        return (
            <section className="container">
                <div className="bs-docs-section clearfix">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Добавление нового слайда</h1>
                            </div>

                           {/* <form >*/} {/*onSubmit={this.handleSubmit}*/}
                                <div className="form-group">
                                    Локация:<br />
                                    <input type='text' name='place' className='form-control fu-place' /> {/* onChange={this.handleChangePlace} */}
                                </div>
                                <div className="form-group">
                                    Номер экрана: <br />
                                    <input type='text' name='screen_num' className='form-control' /> {/*onChange={this.handleChangeScreenNum}*/}
                                </div>
                                <div className="form-group">
                                    Номер слайда: <br />
                                    <input type='text' name='slide_num' className='form-control' /> {/*onChange={this.handleChangeSlideNum}*/}
                                </div>
                                <div className="form-group">
                                    Активен (1 или 0): <br />
                                    <input type='text' name='isactive' className='form-control'  /> {/*onChange={this.handleChangeIsActive}*/}
                                </div>
                                <div className="form-group">
                                    Контент слайда: <br />
                                    <textarea ref={newPostElement} name='slide_content' className='form-control' /> {/*onChange={this.handleChangeContent}*/}
                                </div>
                                <button onClick={addPost}>Add</button>
                                {/*<input type='submit' value='Сохранить' className='btn btn-primary' />*/}
                          {/*  </form>*/}
                        </div>
                    </div>
                </div>
            </section>
        )
    // }
};

export default SlideAdd;