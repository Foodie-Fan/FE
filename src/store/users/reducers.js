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
    GET_USER_FAILURE, CLEAR_ERROR, GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAILURE,
} from "./types";

const initialState = {
    users: [],
    error: "",
    isLoading: false,
    isAuth: !!localStorage.getItem("token"),
    username: "",
    name: "",
    image: "",
    restaurants: 0,
    reviews: 0,
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
                reviews: action.payload.reviews,
                restaurants: action.payload.restaurants,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        //    GET USERS
        case GET_USERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default reducers;
