import {applyMiddleware, combineReducers, createStore} from "redux"
import sliderReducer from "./reducers/slide-reducer"
import authReducer from "./reducers/auth-reducer"
import { reducer as reduxFormReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import tvsReducer from "./reducers/tvs-reducer"
import appReducer from "./reducers/app-reducer"
import placesReducer from "./reducers/places-reducer"
import playandupdate from "./reducers/playandupdate"
import showsReducer from "./reducers/show-reducer"
import schedulesReducer from "./reducers/schedule-reducer"

// @ts-ignore
let rootReducer = combineReducers(
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

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
export default store


