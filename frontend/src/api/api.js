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
            .then(response => {return response.data});
    },
    /*Получаем 1 слайд по ID*/
    getSlide(id) {
        return instance.get(`/slides/`+id)
            .then(response => {return response.data});
    },
    /*Обвноляем 1 слайд по ID*/
    putSlide(id, slide){
        return  instance.put(`/slides/`+id, {slide})
            .then(response => {return response.data});
    },
    deleteSlide(id) {
        return instance.delete(`/slides/`+id)
            .then(response => {return response.data});
    }
};

export const authAPI = {
    me() {
       return instance.get(`/me`).then(response => {return response.data});
    }
}

