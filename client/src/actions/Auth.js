import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const data = await api.signIn(formData);

        dispatch({ type: AUTH, payload: data });

        navigate("/");
    } catch (err) {
        console.log(err.message);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.signUp(formData);

        dispatch({ type: AUTH, payload: data });

        navigate("/");
    } catch (err) {
        console.log(err.message);
    }
};
