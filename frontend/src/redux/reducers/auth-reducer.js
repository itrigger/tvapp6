import {authAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_AUTH_FALSE = 'auth/SET_AUTH_FALSE';

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
                ...action.payload,
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
export const setAuthFalse = () => ({
    type: SET_AUTH_FALSE,
    payload: {_id: null, name: null, email: null, password: null}
});

/*thunk*/
export const getMe = () => (dispatch) => {
    return authAPI.me().then(data => {
        if (data) {
            if (data.resultCode === 0) {
                let {_id, name, email, password} = data.user;
                dispatch(setUserDataAC(_id, name, email, password));
                Notify('TVApp', 'Вы авторизованы', 'success');
            } else {
                Notify('TVApp', 'Вы не авторизованы', 'danger');
            }
        } else {
            Notify('TVApp', 'Сервер не доступен', 'danger');
        }
    })
};
/*thunk*/
export const goLogin = (email, password) => async (dispatch) => {

    let data = await authAPI.login(email, password);

    if (data.resultCode === 0) {
        dispatch(getMe());
        /* } else if(data.resultCode === 3) {
             Notify('TVApp', 'Неправильный пароль', 'warning');
             let action = stopSubmit('login', {_error: 'Проверьте еще раз введенные данные'});
             dispatch(action);
         } else if(data.resultCode === 2){
             Notify('TVApp', 'Пользователь не найден', 'warning');
             let action = stopSubmit('login', {_error: 'Проверьте еще раз введенные данные'});
             dispatch(action);
         }*/
    } else {
        dispatch(stopSubmit('login', {_error: 'Проверьте еще раз введенные данные'}));
        Notify('TVApp', 'Ошибка', 'danger');
    }

};


export default authReducer;