import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import {SET_IMAGE} from "../users/types";

const initialState = {
    error: "",
    isLoading: false,
    restaurants: [],
    file: {},

};

const reducers = (state = initialState, {type, payload}) => {

    switch (type) {
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
                restaurants: {...state.restaurants, payload},
            };
        case  CREATE_RESTAURANT_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };

        case SET_IMAGE:
            console.log('REDUCER IMAGE ', payload);
            return {
                ...state,
                file: payload,
            };

        default:
            return state;
    }
};

export default reducers;
