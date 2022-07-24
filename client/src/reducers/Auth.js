import * as at from '../constants/actionTypes';

const authReducer = (state = {authData : null}, action) => {
    switch (action.type) {
        case at.AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload.data }));

            return { ...state, authData: action?.payload.data };
        case at.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
