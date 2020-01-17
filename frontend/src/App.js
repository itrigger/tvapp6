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
import TVsContainer from "./components/TVs/TVsContainer";
import TVAddContainer from "./components/TVs/add/TVAddContainer";
import TVUpdateContainer from "./components/TVs/update/TVUpdateContainer";
import PlacesContainer from "./components/Places/PlacesContainer";
import PlaceAddContainer from "./components/Places/add/PlaceAddContainer";
import PlaceUpdateContainer from "./components/Places/update/PlaceUpdateContainer";
import PlayContainer from "./components/Play/PlayContainer";
import ShowAddContainer from "./components/Shows/add/ShowAddContainer";
import ShowsContainer from "./components/Shows/ShowsContainer";
import ShowUpdateContainer from "./components/Shows/update/ShowUpdateContainer";


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
                {/*MAIN PAGE*/}
                <Route path="/" exact render={() => <MainpageContainer/>}/>
                {/*SLIDES*/}
                <Route path="/slides" exact render={() => <SlidesContainer/>}/>
                <Route path="/slides/add" render={({history}) => <SlideAddContainer history={history}/>}/>
                <Route path="/slide/update/:id?" render={({history}) => <SlideUpdateContainer history={history}/>}/>
                {/*TVS*/}
                <Route path="/tvss" exact render={() => <TVsContainer/>}/>
                <Route path="/tvs/add" render={({history}) => <TVAddContainer history={history}/>}/>
                <Route path="/tvs/update/:id?" render={({history}) => <TVUpdateContainer history={history}/>}/>
                {/*PLACES*/}
                <Route path="/places" exact render={() => <PlacesContainer/>}/>
                <Route path="/places/add" render={({history}) => <PlaceAddContainer history={history}/>}/>
                <Route path="/places/update/:id?" render={({history}) => <PlaceUpdateContainer history={history}/>}/>
                {/*SHOWS*/}
                <Route path="/shows" exact render={() => <ShowsContainer/>}/>
                <Route path="/show/add" render={({history}) => <ShowAddContainer history={history}/>}/>
                <Route path="/show/update/:id?" render={({history}) => <ShowUpdateContainer history={history}/>}/>
                {/*LOGIN*/}
                <Route path="/login" render={() => <LoginContainer/>}/>
                {/*PLAY PAGE*/}
                <Route path="/play/:id?" render={() => <PlayContainer/>}/>
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