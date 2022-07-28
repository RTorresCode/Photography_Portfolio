/*==================================================
/client/src/reducers/Auth.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object.
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */

import * as at from '../constants/actionTypes'; // Import action types as 'at'

const authReducer = (state = {authData : null}, action) => {
    switch (action.type) {
        case at.AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload.data }));

            return { ...state, authData: action?.payload.data };
        case at.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        default:
            return state; // If action type is unrecognized, return current state (unchanged)
    }
};

export default authReducer;
