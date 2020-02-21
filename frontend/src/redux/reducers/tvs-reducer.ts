import {tvsAPI} from "../../api/api";
import {Notify} from "../../components/common/Notificator/notificator";
import {setAuthFalse} from "./auth-reducer";
import {Redirect} from "react-router-dom";


const ACTIVE_TV_ON = 'tvs/ACTIVE_TV_ON';
type ActiveTvOnActionType = {type: typeof ACTIVE_TV_ON}
const ACTIVE_TV_OFF = 'tvs/ACTIVE_TV_OFF';
type ActiveTvOffActionType = {type: typeof ACTIVE_TV_OFF}
const SET_TVS = 'tvs/SET_TVS';
type SetTvsActionType = {type: typeof SET_TVS}
const SET_TV = 'tvs/SET_TV';
type SetTvActionType = {type: typeof SET_TV}
const DELETE_TV = 'tvs/DELETE_TV';
type DeleteTvActionType = {type: typeof DELETE_TV}
const SET_CURRENT_PAGE = 'tvs/SET_CURRENT_PAGE';
type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE}
const SET_TOTAL_TVS_COUNT = 'tvs/SET_TOTAL_TVS_COUNT';
type SetTotalTvsCountActionType = {type: typeof SET_TOTAL_TVS_COUNT}
const TOGGLE_IS_FETCHING = 'tvs/TOGGLE_IS_FETCHING';
type ToggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING}
const TOGGLE_IS_TVS_UPDATING = 'tvs/TOGGLE_IS_TVS_UPDATING';
type ToggleIsTvsUpdatingActionType = {type: typeof TOGGLE_IS_TVS_UPDATING}

type tvType = {
    _id: any | null
    name: string | null
    place: string | null
    number: number | null
    channel: string | null
    show: string | null
    isactive: string | null
}


let initialState = {
    tvs: [] as Array<tvType> | null,
    pageSize: 4 as number | null,
    totalTVsCount: 0 as number | null,
    currentPage: 1 as number | null,
    tv: {
        _id: null as any | null,
        name: null as string | null,
        place: null as string | null,
        number: null as string | null,
        channel: null as string | null,
        show: null as string | null,
        isactive: null as string | null
    },
    isFetching: false as boolean | null,
    isTVsUpdating: [] as Array<string> | null
}

export type InitialStateType = typeof initialState;

const tvsReducer = (state = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case ACTIVE_TV_ON:
            return {
                ...state,
                tvs: state.tvs.map(s => {
                    if (s._id === action.tvId) {
                        return {...s, isactive: '1'}
                    }
                    return s;
                })
            }
        case ACTIVE_TV_OFF:
            return {
                ...state,
                tvs: state.tvs.map(s => {
                    if (s._id === action.tvId) {
                        return {...s, isactive: '0'}
                    }
                    return s;
                })
            }
        case SET_TV:
            return {
                ...state, tv: action.tv
            }
        case SET_TVS:
            return {
                ...state, tvs: action.tvs
            }
        case DELETE_TV:
            return {
                ...state,
                tvs: state.tvs.filter(tv => tv._id !== action.id)
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_TVS_UPDATING:
            return {
                ...state,
                isTVsUpdating: action.isFetching
                    ? [...state.isTVsUpdating, action.tvID]
                    : [...state.isTVsUpdating.filter(id => id !== action.tvID)]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_TVS_COUNT:
            return {
                ...state, totalTVsCount: action.totalTVsCount
            }
        default:
            return state;
    }
};
type SetTvsTypeAction ={
    type: typeof SET_TVS
    tvs: Array<tvType>
}
export const setTVs = (tvs:Array<tvType>):SetTvsTypeAction => { return {type: SET_TVS, tvs}};
type SetTvTypeAction ={
    type: typeof SET_TV
    tv: Array<tvType>
}
export const setTV = (tv:tvType):SetTvTypeAction => { return {type: SET_TV, tv}};
type ActiveTVOnTypeAction ={
    type: typeof ACTIVE_TV_ON
    tvId: any
}
export const activeTVOn = (tvId:string):ActiveTVOnTypeAction => { return {type: ACTIVE_TV_ON, tvId}};

export const activeTVOff = (tvId:string) => { return {type: ACTIVE_TV_OFF, tvId}};
export const setCurrentPage = (currentPage:number) => { return {type: SET_CURRENT_PAGE, currentPage}};
export const setTotalTVsCount = (totalTVsCount:number) => { return {type: SET_TOTAL_TVS_COUNT, totalTVsCount}};
export const toggleIsFetching = (isFetching:boolean) => { return {type: TOGGLE_IS_FETCHING, isFetching}};
export const toggleIsTVsUpdating = (isFetching:string, tvID:string) => { return {type: TOGGLE_IS_TVS_UPDATING, isFetching, tvID}};

export const deleteTVAC = (id:string) => { return {type: DELETE_TV, id}};


export const getTVs = (currentPage:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        let data = await tvsAPI.getTVs(currentPage, pageSize);
        if (data.resultCode === 0) {
            dispatch(setTVs(data.items));
            dispatch(setTotalTVsCount(data.count));
            dispatch(toggleIsFetching(false));
        }  else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            dispatch(toggleIsFetching(false));
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export const getTV = (id:string) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        let data = await tvsAPI.getTV(id);
        if (data.resultCode === 0) {
            dispatch(toggleIsFetching(false));
            dispatch(setTV(data.item));
        } else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            dispatch(toggleIsFetching(false));
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export const putTVActive = (id:string, tv:tvType, active:string) => {
    return async (dispatch:any) => {
        dispatch(toggleIsTVsUpdating(true, id));
        let data = await tvsAPI.putTVActive(id, tv);
        if (data.resultCode === 0) {
            Notify('TVAPP', 'Панель обновлена', 'success');
            dispatch(toggleIsTVsUpdating(false, id));
            active ? dispatch(activeTVOff(id)) : dispatch(activeTVOn(id));
        } else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            dispatch(toggleIsTVsUpdating(false, id));
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export const putTV = (id:string, tv:tvType) => {
    return async (dispatch:any) => {
        dispatch(toggleIsTVsUpdating(true, id));
        let data = await tvsAPI.putTV(id, tv);
        if (data.resultCode === 0) {
            Notify('TVAPP', 'Панель обновлена', 'success');
            dispatch(toggleIsTVsUpdating(false, id));
        }  else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            dispatch(toggleIsTVsUpdating(false, id));
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};


export const createTV = (tv:tvType) => {
    return async (dispatch:any) => {
        let data = await tvsAPI.createTV(tv);
        if (data.resultCode === 0) {
            Notify('TVAPP', 'Панель добавлена', 'success');
            dispatch(setTV(tv));
        }  else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export const deleteTV = (id:string) => {
    return async (dispatch:any) => {
        let data = await tvsAPI.deleteTV(id);
        if (data.resultCode === 0) {
            Notify('TVAPP', 'Панель удалена', 'success');
            dispatch(deleteTVAC(id));
        }  else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export const reloadTV = (place:string, number:string, channel:string) => {
    return async (dispatch:any) => {
        let data = await tvsAPI.reloadTV(place, number, channel);
        if (data.resultCode === 0) {
            Notify('TVAPP', 'Панель перезагружена', 'success');
        } else {
            Notify('TVAPP', 'Ошибка получения данных', 'danger');
            dispatch(setAuthFalse());
            if(data.resultCode === 10){
                localStorage.removeItem('userData');
                return <Redirect to={'/login'} />
            }
        }
    }
};

export default tvsReducer;