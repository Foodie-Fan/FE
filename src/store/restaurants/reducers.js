import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL, DELETE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_START, DELETE_RESTAURANT_FAILURE
} from "./types";

import {SET_IMAGE} from "../users/types";

const initialState = {
    error: "",
    isLoading: false,
    restaurants: [],
    file: {},

};

const reducers = (state = initialState, {type, payload}) => {
    switch (type) {
        //GET  RESTAURANTS
        case GET_RESTAURANT_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case GET_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                restaurants: payload,
            };
        case  GET_RESTAURANT_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };

        // CREATE RESTAURANT
        case CREATE_RESTAURANT_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                restaurants: {...state.restaurants, ...payload},
            };
        case  CREATE_RESTAURANT_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        //PART OF CREATE RESTAURANT
        case SET_IMAGE:
            return {
                ...state,
                file: payload,
            };

        // DELETE RESTAURANT
        case DELETE_RESTAURANT_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case DELETE_RESTAURANT_SUCCESS:
            const deleteRes = state.restaurants.filter(item => item.id !== payload);
            return {
                ...state,
                isLoading: false,
                restaurants: deleteRes,
                error: ''
            };
        case DELETE_RESTAURANT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            };

        default:
            return state;
    }
};

export default reducers;
