/*==================================================
/client/src/reducers/Photos.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object.
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */

import * as at from '../constants/actionTypes'; // Import action types as 'at'

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
            return state; // If action type is unrecognized, return the current state (unchanged)
    }
}
