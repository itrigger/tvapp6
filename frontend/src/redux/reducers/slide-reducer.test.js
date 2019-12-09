import sliderReducer, {setSlide} from "./slide-reducer";

let state = {
    slides: [],
    pageSize: 10,
    totalSlidesCount: 0,
    currentPage: 1,
    slide: {
        _id: null,
        place: null,
        slide_num: null,
        screen_num: null,
        isactive: null,
        delay: null,
        slide_content: null

    },
    isFetching: false,
    isSlidesUpdating: []
}

it('slide should set new data, checking by _id', () => {
    // 1. test data
    let action = setSlide({
        _id: '1',
        place: 'test',
        slide_num: '1',
        screen_num: 1,
        isactive: 1,
        delay: 1000,
        slide_content: 'test'
    });

    // 2.action
    let newState = sliderReducer(state, action);

    // 3. expectation
    expect(newState.slide._id).toBe('1');
});