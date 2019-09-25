import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
/*import logo from './logo.svg';*/
import 'bootswatch/dist/slate/bootstrap.min.css';
import Header from './components/Header/Header';
import MyNavbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';

import './App.css';

const App = (props) =>{
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <MyNavbar />
                <Route path="/"
                       render={()=><Mainpage tvs={props.tvs} />} />
            </div>
        </BrowserRouter>
    );
}

export default App;
