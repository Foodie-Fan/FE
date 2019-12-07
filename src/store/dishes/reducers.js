import {
    GET_DISHES_START,
    GET_DISHES_SUCCESS,
    GET_DISHES_FAIL,
    CREATE_DISH_START,
    CREATE_DISH_SUCCESS,
    CREATE_DISH_FAIL
} from "./types";
import {SET_IMAGE} from "../users/types";

const initialState = {
    error: "",
    isLoading: false,
    dishes: [],
    file: {},

};

const reducers = (state = initialState, {type, payload}) => {

    switch (type) {
        case GET_DISHES_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case GET_DISHES_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                dishes: payload,
            };
        case  GET_DISHES_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        case CREATE_DISH_START:
            return {
                ...state,
                error: "",
                isLoading: true,
            };
        case CREATE_DISH_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                dishes: {...state.dishes, payload},
            };
        case  CREATE_DISH_FAIL:
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
