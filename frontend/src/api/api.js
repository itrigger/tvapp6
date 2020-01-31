import {myConfig} from "../config/config";
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: myConfig.API_URL
});


export const slidesAPI = {
    /*Получаем слайды постранично*/
    getSlides(currentPage, pageSize) {
        return instance.get(`/slides?page=${currentPage}&size=${pageSize}`)
            .then(response => { return response.data });
    },
    /*Получаем 1 слайд по ID*/
    getSlide(id) {
        return instance.get(`/slides/`+id)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 слайд по ID*/
    putSlideActive(id, slide){
        return  instance.put(`/slides/`+id, {slide})
            .then(response => {return response.data});
    },
    putSlide(id, slide){
        return  instance.put(`/slides/`+id, slide)
            .then(response => {return response.data});
    },
    createSlide(slide){
        return  instance.post(`/slides/`, slide)
            .then(response => {return response.data});
    },
    deleteSlide(id) {
        return instance.delete(`/slides/`+id)
            .then(response => {return response.data});
    }
};

export const authAPI = {
    me() {
       return instance.get(`/me`)
           .then(response => {return response.data})
           .catch(error => {
               return error.data
           });
    },
    login(email, password) {
        return instance.post(`/login`, email, password)
            .then(response => {console.log(response.data); return response.data;});
    }
};


export const tvsAPI = {
    /*Получаем панели постранично*/
    getTVs(currentPage, pageSize){
        return instance.get(`/tvs/all?page=${currentPage}&size=${pageSize}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Получаем 1 панель по ID*/
    getTV(id) {
        return instance.get(`/tvs/`+id)
            .then(response => {return response.data});
    },
    /*Обновляем 1 панель по ID*/
    putTVActive(id, tv){
        return  instance.put(`/tvs/`+id, tv)
            .then(response => {return response.data});
    },
    /*Обновляем 1 панель по ID*/
    putTV(id, tv){
        return  instance.put(`/tvs/`+id, tv)
            .then(response => {return response.data});
    },
    /*Создаем панель*/
    createTV(tv){
        return  instance.post(`/tvs/`, tv)
            .then(response => {return response.data});
    },
    /*Удаляем панель*/
    deleteTV(id) {
        return instance.delete(`/tvs/`+id)
            .then(response => {return response.data});
    },
    reloadTV(channel){
        return instance.get(`/update/?channel=${channel}`)
            .then(response => {
                return response;
            })
    }
};

export const placesAPI = {
    /*Получаем панели постранично*/
    getPlaces(currentPage, pageSize){
        return instance.get(`/places/all?page=${currentPage}&size=${pageSize}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Получаем 1 панель по ID*/
    getPlace(id) {
        return instance.get(`/places/`+id)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 панель по ID*/
    putPlaceActive(id, place){
        return  instance.put(`/places/`+id, place)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 панель по ID*/
    putPlace(id, place){
        return  instance.put(`/places/`+id, place)
            .then(response => {return response.data});
    },
    /*Создаем панель*/
    createPlace(place){
        return  instance.post(`/places/`, place)
            .then(response => {return response.data});
    },
    /*Удаляем панель*/
    deletePlace(id) {
        return instance.delete(`/places/`+id)
            .then(response => {return response.data});
    }
};


export const showAPI = {
    /*Получаем панели постранично*/
    getShows(currentPage, pageSize){
        return instance.get(`/show/?page=${currentPage}&size=${pageSize}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Получаем 1 панель по ID*/
    getShow(id) {
        return instance.get(`/show/`+id)
            .then(response => {return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Обвноляем 1 панель по ID*/
    putShow(id, show){
        return  instance.put(`/show/`+id, show)
            .then(response => {return response.data});
    },
    /*Создаем панель*/
    createShow(show){
        return  instance.post(`/show/`, show)
            .then(response => {return response.data});
    },
    /*Удаляем панель*/
    deleteShow(id) {
        return instance.delete(`/show/`+id)
            .then(response => {return response.data});
    }
};


export const scheduleAPI = {
    /*Получаем расписание постранично*/
    getSchedules(currentPage, pageSize){
        return instance.get(`/schedules/?page=${currentPage}&size=${pageSize}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Получаем 1 расписание по ID*/
    getSchedule(id) {
        return instance.get(`/schedules/`+id)
            .then(response => {return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Обвноляем 1 расписание по ID*/
    putSchedule(id, schedule){
        return  instance.put(`/schedules/`+id, schedule)
            .then(response => {return response.data});
    },
    /*Создаем расписание*/
    createSchedule(schedule){
        return  instance.post(`/schedules/`, schedule)
            .then(response => {return response.data});
    },
    /*Удаляем расписание*/
    deleteSchedule(id) {
        return instance.delete(`/schedules/`+id)
            .then(response => {return response.data});
    }
};


export const playAPI = {
    getSlides(channel){
        return instance.get(`/play/?channel=${channel}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },

}

