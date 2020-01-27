import {applyMiddleware, combineReducers, createStore} from "redux";
import sliderReducer from "./reducers/slide-reducer";
import authReducer from "./reducers/auth-reducer";
import { reducer as reduxFormReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import tvsReducer from "./reducers/tvs-reducer";
import appReducer from "./reducers/app-reducer";
import placesReducer from "./reducers/places-reducer";
import playandupdate from "./reducers/playandupdate";
import showsReducer from "./reducers/show-reducer";
import schedulesReducer from "./reducers/schedule-reducer";


let reducers = combineReducers(
    {
        sliderReducer,
        authReducer,
        tvsReducer,
        appReducer,
        placesReducer,
        playandupdate,
        showsReducer,
        schedulesReducer,
        form: reduxFormReducer, // mounted under "form"
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;


