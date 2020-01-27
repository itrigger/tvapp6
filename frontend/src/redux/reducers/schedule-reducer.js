import {scheduleAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";


const SET_SCHEDULES = 'schedule/SET_SCHEDULES';
const SET_SCHEDULE = 'schedule/SET_SCHEDULE';
const DELETE_SCHEDULE = 'schedule/DELETE_SCHEDULE';
const SET_CURRENT_PAGE = 'schedule/SET_CURRENT_PAGE';
const SET_TOTAL_SCHEDULES_COUNT = 'schedule/SET_TOTAL_SCHEDULES_COUNT';
const TOGGLE_IS_FETCHING = 'schedule/TOGGLE_IS_FETCHING';
const TOGGLE_IS_SCHEDULES_UPDATING = 'schedule/TOGGLE_IS_SCHEDULES_UPDATING';

let initialState = {
    schedules: [],
    pageSize: 10,
    totalSchedulesCount: 0,
    currentPage: 1,
    schedule: {
        _id: null,
        name: null,
        description: null,
        isactive: null,
        starttime: null,
        endtime: null,
        periodic: null,
        show: null,
        channel: null,
        online: "0"
    },
    isFetching: false,
    isSchedulesUpdating: []
}

const schedulesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SCHEDULE:
            return {
                ...state, schedule: action.schedule
            }
        case SET_SCHEDULES:
            return {
                ...state, schedules: action.schedules
            }
        case DELETE_SCHEDULE:
            return {
                ...state,
                schedules: state.schedules.filter(schedule => schedule._id !== action.id)
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_SCHEDULES_UPDATING:
            return {
                ...state,
                isShowsUpdating: action.isFetching
                    ? [...state.isShowsUpdating, action.id]
                    : [...state.isShowsUpdating.filter(id => id !== action.id)]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_SCHEDULES_COUNT:
            return {
                ...state, totalShowsCount: action.totalShowsCount
            }
        default:
            return state;
    }
};

export const setSchedules = (schedules) => {return {type: SET_SCHEDULES, schedules}};
export const setSchedule = (schedule) => {return {type: SET_SCHEDULE, schedule}};
export const setCurrentPage = (currentPage) => {return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalSchedulesCount = (totalShowsCount) => {return {type: SET_TOTAL_SCHEDULES_COUNT, totalShowsCount}};
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsSchedulesUpdating = (isFetching, id) => {return {type: TOGGLE_IS_SCHEDULES_UPDATING, isFetching, id}};
export const deleteScheduleAC = (id) => {  return {type: DELETE_SCHEDULE, id}};

export const getSchedules = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await scheduleAPI.getSchedules(currentPage, pageSize);

    if (data.resultCode === 0) {
        dispatch(setSchedules(data.items));
        dispatch(setTotalSchedulesCount(data.count));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
    }

};

export const getSchedule = (id) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await scheduleAPI.getSchedule(id);

    if (data.resultCode === 0) {
        dispatch(setSchedule(data.item));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
    }

};



export const putSchedule = (id, schedule) => async (dispatch) => {

    dispatch(toggleIsSchedulesUpdating(true, id));

    let data = await scheduleAPI.putSchedule(id, schedule);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Расписание обновлено', 'success');
        dispatch(toggleIsSchedulesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};


export const createSchedule = (schedule) => async (dispatch) => {

    let data = await scheduleAPI.createSchedule(schedule);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Расписание добавлено', 'success');
        dispatch(setSchedule(schedule));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};

export const deleteSchedule = (id) => async (dispatch) => {

    let data = await scheduleAPI.deleteSchedule(id);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Расписание удалено', 'success');
        dispatch(deleteScheduleAC(id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
    }

};

export default schedulesReducer;