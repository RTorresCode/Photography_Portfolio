/*==================================================
/client/src/actions/Photos.js

Makes API calls to the backend, then dispatches actions to the redux
store when Users attempt to view, edit, delete, or search for photos
================================================== */

import * as api from '../api';
import * as at from '../constants/actionTypes';

// Action Creators

export const getPhoto = (id) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING }); // Dispatch to redux store to show loading circle

        const { data } = await api.fetchPhoto(id); // Make API call to backend

        dispatch({ type: at.FETCH_PHOTO, payload: data }); // Dispatch data to redux store
        dispatch({ type: at.END_LOADING }); // Dispatch to redux store to hide loading circle
    } catch (err) {
        console.log(err.message);
    }
};

export const getPhotos = (page) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING }); // Dispatch to redux store to show loading circle

        const { data } = await api.fetchPhotos(page); // Make API call to backend

        dispatch({ type: at.FETCH_ALL, payload: data }); // Dispatch data to redux store
        dispatch({ type: at.END_LOADING }); // Dispatch to redux store to hide loading circle
    } catch (err) {
        console.log(err.message);
    };
};

export const getPhotosBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING }); // Dispatch to redux store to show loading circle

        const { data: { data } } = await api.fetchPhotosBySearch(searchQuery); // Make API call to backend

        dispatch({ type: at.FETCH_BY_SEARCH, payload: data }); // Dispatch data to redux store
        dispatch({ type: at.END_LOADING }); // Dispatch to redux store to hide loading circle
    } catch (err) {
        console.log(err.message);
    };
};

export const addPhoto = (photo, navigate) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING }); // Dispatch to redux store to show loading circle

        const { data } = await api.addPhoto(photo); // Make API call to backend

        navigate(`/photos/${data._id}`); // Navigate User to newly added photo's details page
        dispatch({ type: at.CREATE, payload: data }); // Dispatch data to redux store
    } catch (err) {
        console.log(err.message);
    };
};

export const updatePhoto = (id, photo) => async (dispatch) => {
    try {
        const { data } = await api.updatePhoto(id, photo); // Make API call to backend

        dispatch({ type: at.UPDATE, payload: data }); // Dispatch action to redux store
    } catch (err) {
        console.log(err.message);
    };
};

export const deletePhoto = (id) => async (dispatch) => {
    try {
        await api.deletePhoto(id); // Make API call to backend

        dispatch({ type: at.DELETE, payload: id }); // Dispatch action to redux store
    } catch (err) {
        console.log(err.message);
    };
};
