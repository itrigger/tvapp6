import {combineReducers, createStore} from "redux";
import sliderReducer from "./reducers/slide-reducer";
import sliderUpdateReducer from "./reducers/slideUpdate-reducer";

let reducers = combineReducers(
    {
        sliderReducer,
        sliderUpdateReducer
    }
)

let store = createStore(reducers);

export default store;


