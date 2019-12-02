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
    /*Получаем экраны постранично*/
    getTVs(){
        return instance.get(`/tvs/all`)
            .then(response=>{return response.data})
            .catch(error=>{
                return error.data
            });
    },
    /*Получаем 1 экран по ID*/
    getTV(id) {
        return instance.get(`/tvs/`+id)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 экран по ID*/
    putTVActive(id, tv){
        return  instance.put(`/tvs/`+id, tv)
            .then(response => {return response.data});
    },
    putTV(id, tv){
        return  instance.put(`/tvs/`+id, tv)
            .then(response => {return response.data});
    },
    createTV(tv){
        return  instance.post(`/tvs/`, tv)
            .then(response => {return response.data});
    },
    deleteTV(id) {
        return instance.delete(`/tvs/`+id)
            .then(response => {return response.data});
    }
};