import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from 'react-redux';
import ReactNotifications from 'react-notifications-component';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import MyNavbar from './components/Navbar/Navbar';
import SlideAddContainer from "./components/Slides/add/SlideAddContainer";
import Footer from "./components/Footer/Footer";
import SlidesContainer from "./components/Slides/SlidesContainer";
import SlideUpdateContainer from "./components/Slides/update/SlideUpdateContainer";
import LoginContainer from "./components/Login/LoginContainer";
import MainpageContainer from "./components/Mainpage/MainpageContainer";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div className="App">
                <ReactNotifications/>
                <HeaderContainer/>
                <MyNavbar/>
                <Route path="/" exact
                       render={() => <MainpageContainer/>}/>
                <Route path="/slides/add"
                       render={({history}) => <SlideAddContainer history={history}/>}/>
                <Route path="/slides" exact
                       render={() => <SlidesContainer/>}/>
                <Route path="/slide/update/:id?"
                       render={({history}) => <SlideUpdateContainer history={history}/>}/>
                <Route path="/login" render={() => <LoginContainer/>}/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.appReducer.initialized
});

export default compose(
     connect(mapStateToProps, {initializeApp}),
    withRouter
)(App);
