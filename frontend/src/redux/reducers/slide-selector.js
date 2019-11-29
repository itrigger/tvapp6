import {createSelector} from 'reselect';

/*Простой селектор нужен для того, чтобы организовать многократное используемое обращение к стейту в одном месте
* и переиспользовать его в mapStateToProps*/
export const getSlidesSel = (state) => {
    return state.sliderReducer.slides;
}

/*Комбинированный селектор используется, когда с выбранными данными из стейта нужно проделать какие-то операции
* тут можно объединять более простые селекторы. В целом, селектор следит за измененями в стейте только тех данных,
* которые ему нужны и неперерисовывает понапрасну компоненты*/
export const getSlidesSortedSel = createSelector(getSlidesSel, (slides)=>{
   return slides.sort(function(a,b){
        return a.slide_num-b.slide_num
    });
    //return slides.reverse();
});

export const getSlideUpdateSel = (state) => {
    return state.sliderUpdateReducer.slide;
}

export const getSlideSel = (state) => {
    return state.sliderReducer.slide;
}

export const pageSizeSel = (state) => {
    return state.sliderReducer.pageSize;
};

export const totalSlidesCountSel = (state) => {
    return state.sliderReducer.totalSlidesCount;
};

export const currentPageSel = (state) => {
    return state.sliderReducer.currentPage;
};

export const isFetchingSel = (state) => {
    return state.sliderReducer.isFetching;
};

export const isSlidesUpdatingSel = (state) => {
    return state.sliderReducer.isSlidesUpdating;
};
