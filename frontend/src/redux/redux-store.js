import {combineReducers, createStore} from "redux";
import sliderReducer from "./reducers/slide-reducer";



let reducers = combineReducers(
    {
        sliderReducer
    }
)

let store = createStore(reducers);

export default store;



// import {applyMiddleware, combineReducers, compose, createStore} from "redux";
// import { reducer as formReducer } from 'redux-form'
// import thunkMiddleware from 'redux-thunk'
//
// let reducers = combineReducers({
//     // ...your other reducers here
//     // you have to pass formReducer under 'form' key,
//     // for custom keys look up the docs for 'getFormState'
//     form: formReducer
// })
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));
// window.__store__ = store;
//
// export default store;