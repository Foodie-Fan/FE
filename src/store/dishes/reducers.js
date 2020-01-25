import {
    GET_DISHES_START,
    GET_DISHES_SUCCESS,
    GET_DISHES_FAIL,
    CREATE_DISH_START,
    CREATE_DISH_SUCCESS,
    CREATE_DISH_FAIL,
    GET_PROFILE_REVIEWS_START,
    GET_PROFILE_REVIEWS_SUCCESS,
    GET_PROFILE_REVIEWS_FAILURE,
    FILTER_DISHES,
    DELETE_DISH_START, DELETE_DISH_SUCCESS, DELETE_DISH_FAILURE
} from "./types";
import {SET_IMAGE} from "../users/types";

const initialState = {
    error: "",
    isLoading: false,
    profileReviews: [],
    dishes: [],
    filteredDishes: [],
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
                filteredDishes: payload,
            };
        case  GET_DISHES_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };

        case GET_PROFILE_REVIEWS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILE_REVIEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profileReviews: payload,
            };
        case GET_PROFILE_REVIEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            };

        case DELETE_DISH_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case DELETE_DISH_SUCCESS:
            const deleteDishes = state.dishes.filter(item => item.id !== payload);
            return {
                ...state,
                isLoading: false,
                dishes: deleteDishes,
                filteredDishes: deleteDishes,
                error: ''
            };
        case DELETE_DISH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
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

        case FILTER_DISHES:
            return {
                ...state,
                filteredDishes: payload
            };

        case SET_IMAGE:
            return {
                ...state,
                file: payload,
            };

        default:
            return state;
    }
};

export default reducers;
