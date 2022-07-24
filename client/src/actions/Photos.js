import * as api from '../api';
import * as at from '../constants/actionTypes';

// Action Creators

export const getPhoto = (id) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING });

        const { data } = await api.fetchPhoto(id);

        dispatch({ type: at.FETCH_PHOTO, payload: data });
        dispatch({ type: at.END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
};

export const getPhotos = (page) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING });

        const { data } = await api.fetchPhotos(page);

        dispatch({ type: at.FETCH_ALL, payload: data });
        dispatch({ type: at.END_LOADING });
    } catch (err) {
        console.log(err.message);
    };
};

export const getPhotosBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING });

        const { data: { data } } = await api.fetchPhotosBySearch(searchQuery);

        dispatch({ type: at.FETCH_BY_SEARCH, payload: data });
        dispatch({ type: at.END_LOADING });
    } catch (err) {
        console.log(err.message);
    };
};

export const addPhoto = (photo, navigate) => async (dispatch) => {
    try {
        dispatch({ type: at.START_LOADING });

        const { data } = await api.addPhoto(photo);

        navigate(`/photos/${data._id}`);
        dispatch({ type: at.CREATE, payload: data });
    } catch (err) {
        console.log(err.message);
    };
};

export const updatePhoto = (id, photo) => async (dispatch) => {
    try {
        const { data } = await api.updatePhoto(id, photo);

        dispatch({ type: at.UPDATE, payload: data });
    } catch (err) {
        console.log(err.message);
    };
};

export const deletePhoto = (id) => async (dispatch) => {
    try {
        await api.deletePhoto(id);

        dispatch({ type: at.DELETE, payload: id });
    } catch (err) {
        console.log(err.message);
    };
};
