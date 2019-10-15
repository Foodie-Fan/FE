import axios from "axios";

import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE, GET_USER_START, GET_USER_SUCCESS, GET_USER_FAILURE, SET_IMAGE, CLEAR_ERROR,
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";

//login action
export const getUser = () => dispatch =>{
    dispatch({type: GET_USER_START});
    axiosWithAuth()
        .get("http://localhost:5000/users/")
        .then(res => dispatch({type: GET_USER_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_USER_FAILURE, payload: error}))
};

export const login = (credentials, history) => {
    return dispatch => {
        dispatch({type: LOGIN_START});
        axios
            .post("http://localhost:5000/auth/login", credentials)
            .then(res => {
                dispatch({type: LOGIN_SUCCESS, payload: res.data});
                localStorage.setItem("token", res.data);
                history.push("/dashboard");
            })
            .catch(err => {
                dispatch({type: LOGIN_FAIL, payload: err.response});
                console.log('authFailure', err.response);
            });
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({type: LOGOUT});
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
    };
};

export const register = (user, history) => dispatch => {
    dispatch({type: REGISTER_START});
    console.log('USER ', user);
    axios.post("http://localhost:5000/auth/register", user)
        .then(res => {
            console.log('res ', res);
            dispatch({type: REGISTER_SUCCESS, payload: user});
            history.push("/login");
        })
        .catch(err => {
            dispatch({type: REGISTER_FAILURE, payload: err.response});
        })
};

export const setImage = (file) => dispatch => {
    dispatch({type: SET_IMAGE, payload: file})
};

export const clearError = () => dispatch => {
    dispatch({type: CLEAR_ERROR})
};


