import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from 'react-redux';
import ReactNotifications from 'react-notifications-component';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './App.css';
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/reducers/app-reducer";
import HeaderContainer from './components/Header/HeaderContainer';
import MyNavbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import MainpageContainer from "./components/Mainpage/MainpageContainer";
import LoginContainer from "./components/Login/LoginContainer";
import PlayContainer from "./components/Play/PlayContainer";
import setAuthToken from "./context/AuthContext";
import {goLogout, setAuthFalse} from "./redux/reducers/auth-reducer";
import {withAuthRedirect} from "./hoc/withAuthRedirect";
import Logout from "./components/Logout/Logout";


const TVsContainer = React.lazy(()=> import("./components/TVs/TVsContainer"));
const TVAddContainer  = React.lazy(()=> import("./components/TVs/add/TVAddContainer"));
const TVUpdateContainer  = React.lazy(()=> import("./components/TVs/update/TVUpdateContainer"));

const PlacesContainer  = React.lazy(()=> import("./components/Places/PlacesContainer"));
const PlaceAddContainer  = React.lazy(()=> import("./components/Places/add/PlaceAddContainer"));
const PlaceUpdateContainer  = React.lazy(()=> import("./components/Places/update/PlaceUpdateContainer"));

const ShowsContainer  = React.lazy(()=> import("./components/Shows/ShowsContainer"));
const ShowAddContainer  = React.lazy(()=> import("./components/Shows/add/ShowAddContainer"));
const ShowUpdateContainer  = React.lazy(()=> import("./components/Shows/update/ShowUpdateContainer"));

const SchedulesContainer  = React.lazy(()=> import("./components/Schedules/SchedulesContainer"));
const ScheduleAddContainer  = React.lazy(()=> import("./components/Schedules/add/ScheduleAddContainer"));
const ScheduleUpdateContainer  = React.lazy(()=> import("./components/Schedules/update/ScheduleUpdateContainer"));

const SlidesContainer = React.lazy(() =>  import("./components/Slides/SlidesContainer"));
const SlideAddContainer = React.lazy(() =>  import("./components/Slides/add/SlideAddContainer"));
const SlideUpdateContainer = React.lazy(() =>  import("./components/Slides/update/SlideUpdateContainer"));


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
                <React.Suspense fallback={<Preloader />}>
                {/*SLIDES*/}
                    <Route path="/slides" exact render={ ()=> <SlidesContainer/>} />
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
                {/*SCHEDULES*/}
                <Route path="/schedules" exact render={() => <SchedulesContainer/>}/>
                <Route path="/schedule/add" render={({history}) => <ScheduleAddContainer history={history}/>}/>
                <Route path="/schedule/update/:id?" render={({history}) => <ScheduleUpdateContainer history={history}/>}/>
                </React.Suspense>
                {/*LOGIN*/}
                <Route path="/login" render={() => <LoginContainer/>}/>
                <Route path="/logout" exact render={()=> <Logout />}/>
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