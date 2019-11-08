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

export default authReducer;