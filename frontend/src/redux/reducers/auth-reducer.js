import {authAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_FALSE = 'SET_AUTH_FALSE';

let initialState = {
    _id: null,
    name: null,
    email: null,
    password: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_AUTH_FALSE:
            return {
                ...state,
                isAuth: false
            }
        default:
            return state;
    }

};

export const setUserDataAC = (_id, name, email, password) => ({
    type: SET_USER_DATA,
    data: {_id, name, email, password}
});
export const setAuthFalse = () => ({type: SET_AUTH_FALSE});

export const getMe = () => {
    return (dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {_id, name, email, password} = data.user;
                dispatch(setUserDataAC(_id, name, email, password));
            } else {
                console.log('error getting profile');
            }
        })
    }
};

export const goLogin = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password).then(data => {
            if (data.resultCode === 0) {
                dispatch(getMe());
            } else if(data.resultCode === 3) {
                Notify('TVApp', 'Password incorrect', 'warning');
            } else if(data.resultCode === 2){
                Notify('TVApp', 'User not found', 'warning');
            }
        })
    }
};


export default authReducer;