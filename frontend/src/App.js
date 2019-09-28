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


const App = (props) =>{
    return (

            <div className="App">
                <ReactNotifications />
                <Header />
                <MyNavbar />
                <Route path="/" exact
                       render={()=><Mainpage tvs={props.tvs} />} />
                <Route path="/slides/add"
                       render={()=><SlideAdd />} />
                <Route path="/slides" exact
                       render={()=><Slides />} />
                <Route path="/slides/update/"
                       render={()=><SlideUpdate id={props.id} />} />
                <Footer />
            </div>
    );
}

export default App;
