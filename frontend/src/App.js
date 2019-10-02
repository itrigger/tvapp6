import React from 'react';
import {Route} from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import MyNavbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import SlideAdd from "./components/Slides/SlideAdd";
import Slides from "./components/Slides/Slides";
import Footer from "./components/Footer/Footer";
import SlideUpdate from "./components/Slides/SlideUpdate";
/*import Login from "./components/Login/Login";
import store from "./redux/redux-store";*/
import {browserHistory} from 'react-router-dom'


const App = (props) =>{

    return (

            <div className="App">
                <ReactNotifications />
                <Header />
                <MyNavbar />
                <Route path="/" exact
                       render={()=><Mainpage />} />
                <Route path="/slides/add"
                       render={()=><SlideAdd />} />
                <Route path="/slides" exact
                       render={()=><Slides slides={props.state.slides}/>} />
                <Route path="/slides/update/"
                       render={()=><SlideUpdate />} />
                <Footer />
            </div>
    );
}

export default App;
