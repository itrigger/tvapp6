import {authAPI} from "../../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

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
            return{
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }

};

export const setUserDataAC = (_id, name, email, password) => ({type: SET_USER_DATA, data:{_id, name, email, password}});

export const getMe = () => {
    return (dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {_id, name, email, password} = data.user;
                dispatch(setUserDataAC(_id, name, email, password));
            }
        })
    }
};

export const goLogin = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password).then(data => {
            if (data.resultCode === 0) {
                dispatch(getMe());
            }
        })
    }
};


export default authReducer;