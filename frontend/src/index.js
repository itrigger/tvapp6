import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import {addPost, updateNewPostText} from "./redux/state";
import store from "./redux/state";


let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                dispatch={store.dispatch.bind(store)}
            />
        </BrowserRouter>, document.getElementById('root')
    );
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);



/*subscribe(rerenderEntireTree);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
