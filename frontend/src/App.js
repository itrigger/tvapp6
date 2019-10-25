import React from 'react';
import {Route} from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import MyNavbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import SlideAddContainer from "./components/Slides/SlideAddContainer";
import Slides from "./components/Slides/Slides";
import Footer from "./components/Footer/Footer";
import SlideUpdate from "./components/Slides/update/SlideUpdate";
import SlidesContainer from "./components/Slides/SlidesContainer";
import SlideUpdateContainer from "./components/Slides/update/SlideUpdateContainer";
/*import Login from "./components/Login/Login";*/


const App = (props) => {

    return (
        <div className="App">
            <ReactNotifications/>
            <Header/>
            <MyNavbar/>
            <Route path="/" exact
                   render={() => <Mainpage/>}/>
            <Route path="/slides/add"
                   render={({history}) => <SlideAddContainer
                       history={history}
                   />}
            />
            <Route path="/slides" exact
                   render={() => <SlidesContainer/>}/>
            <Route path="/slides/update/:id?"
                   render={() => <SlideUpdateContainer/>}/>
            <Footer/>
        </div>
    );
}

export default App;
