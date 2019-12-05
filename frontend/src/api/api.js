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
    /*Обвноляем 1 панель по ID*/
    putTVActive(id, tv){
        return  instance.put(`/tvs/`+id, tv)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 панель по ID*/
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
    reloadTV(place, number, channel){
        return instance.get(`/update/?${channel}&place=${place}&number=${number}`)
            .then(response => {
                return console.log('Ok');
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

export const playAPI = {
    getSlides(place, screen_num, channel){
        return instance.get(`/play/?place=${place}&num=${screen_num}&channel=${channel}`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
}