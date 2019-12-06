import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";

const initialState = {
    error: "",
    isLoading: false,
    restaurants: []
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

        default:
            return state;
    }
};

export default reducers;
