import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    SET_IMAGE,
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE, CLEAR_ERROR,
} from "./types";

const initialState = {
    error: "",
    isLoading: false,
    isAuth: !!localStorage.getItem("token"),
    username: "",
    name: "",
    image: "",
    file: {},
};

const reducers = (state = initialState, action) => {

    switch (action.type) {
        case CLEAR_ERROR:
            return {
                error: "",
                isLoading: false,
            };
        case LOGIN_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                isAuth: true,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case LOGOUT:
            return {
                ...state,
                error: "",
                isLoading: false,
                isAuth: false,
            };

        case REGISTER_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                username: action.payload.username,
                image: action.payload.avatar
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload.data.errorMessage ? action.payload.data.errorMessage : action.payload,
                isLoading: false,
            };

        case SET_IMAGE:
            return {
                ...state,
                file: action.payload,
            };

        case GET_USER_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                username: action.payload.username,
                name: action.payload.name,
                image: action.payload.avatar,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducers;
