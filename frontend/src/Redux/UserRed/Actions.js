import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, CLEAR_ERRORS } from "./ActionTypes";

import axios from 'axios';
// action dispatcher for create and login user
export const LoginUser = (username) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`/feynman-board/api/enteruser`, { username }, config);
        let user = data.user;
        console.log(user);
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.error });
    }
};

// action Dispatcher to load User time to time if LoggedIn
export const Loaduser = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get('/feynman-board/api/getuser');
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.error });
    }
}

// Action Dispatcher to Logout the user
export const Logoutuser = () => async (dispatch) => {
    try {
        await axios.get(`/feynman-board/api/logoutuser`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
        dispatch({ type: LOGOUT_FAIL, payload: err.response.data.error });
        console.log(err.response.data.error);
    }
}

// clear all when handling errors to avoid repeatative error rendering
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
};