import * as at from '../constants/actionTypes';

export default (state = { isLoading: "true", photos: []}, action) => {
    switch (action.type) {
        case at.START_LOADING:
            return { ...state, isLoading: true };
        case at.END_LOADING:
            return { ...state, isLoading: false };
        case at.FETCH_ALL:
            return {
                ...state,
                photos: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case at.FETCH_BY_SEARCH:
            return { ...state, photos: action.payload };
        case at.FETCH_PHOTO:
            return { ...state, photo: action.payload };
        case at.CREATE:
            return { ...state, photos: [...state.photos, action.payload] };
        case at.UPDATE:
            return {...state, photos: state.photos.map((photo) => photo._id === action.payload._id ? action.payload : photo)};
        case at.DELETE:
            return {...state, photos: state.photos.filter((photo) => photo._id !== action.payload)};
        default:
            return state;
    }
}
