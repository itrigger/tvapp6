import {applyMiddleware, combineReducers, createStore} from "redux";
import sliderReducer from "./reducers/slide-reducer";
import sliderUpdateReducer from "./reducers/slideUpdate-reducer";
import authReducer from "./reducers/auth-reducer";
import { reducer as reduxFormReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import tvsReducer from "./reducers/tvs-reducer";
import appReducer from "./reducers/app-reducer";

let reducers = combineReducers(
    {
        sliderReducer,
        sliderUpdateReducer,
        authReducer,
        tvsReducer,
        appReducer,
        form: reduxFormReducer, // mounted under "form"
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;


