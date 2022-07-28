/*==================================================
/client/src/actions/Auth.js

Makes API calls to the backend, then dispatches actions to the
redux store when Users attempt to sign in and sign up
================================================== */

// Import modules
import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const data = await api.signIn(formData); // Make API call to backend

        dispatch({ type: AUTH, payload: data }); // Dispatch action to redux store

        navigate("/"); // Navigate User back to Home page
    } catch (err) {
        console.log(err.message);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.signUp(formData); // Make API call to backend

        dispatch({ type: AUTH, payload: data }); // Dispatch action to redux store

        navigate("/"); // Navigate User back to Home page
    } catch (err) {
        console.log(err.message);
    }
};
