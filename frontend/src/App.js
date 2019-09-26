import React from 'react';
import {Route} from 'react-router-dom';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import MyNavbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import SlideAdd from "./components/Slides/SlideAdd";
import Slides from "./components/Slides/Slides";



const App = (props) =>{
    return (

            <div className="App">
                <Header />
                <MyNavbar />
                <Route path="/" exact
                       render={()=><Mainpage tvs={props.tvs} />} />
                <Route path="/slideadd"
                       render={()=><SlideAdd />} />
                <Route path="/slides"
                       render={()=><Slides />} />
            </div>
    );
}

export default App;
