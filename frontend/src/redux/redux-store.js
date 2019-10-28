import {combineReducers, createStore} from "redux";
import sliderReducer from "./reducers/slide-reducer";
import sliderUpdateReducer from "./reducers/slideUpdate-reducer";
import { reducer as reduxFormReducer } from 'redux-form';


let reducers = combineReducers(
    {
        sliderReducer,
        sliderUpdateReducer,
        form: reduxFormReducer, // mounted under "form"
    }
)

let store = createStore(reducers);

window.store = store;
export default store;


