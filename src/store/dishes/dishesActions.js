import {
    GET_DISHES_START,
    GET_DISHES_SUCCESS,
    GET_DISHES_FAIL,
    SET_IMAGE,
    CREATE_DISH_START,
    CREATE_DISH_SUCCESS,
    CREATE_DISH_FAIL
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import {DISHES_ALL} from "../../components/dashboard/Tabs";

export const getDishes = () => dispatch => {
    dispatch({type: GET_DISHES_START});
    axiosWithAuth()
        .get("/reviews/")
        .then(res => dispatch({type: GET_DISHES_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_DISHES_FAIL, payload: error}))
};

export const createDish = (restaurant, back) => dispatch => {
    dispatch({type: CREATE_DISH_START});
    axiosWithAuth()
        .post("/reviews/", restaurant)
        .then(res => {
            dispatch({type: CREATE_DISH_SUCCESS, payload: restaurant});
            back(DISHES_ALL)
        })
        .catch(err => {
            dispatch({type: CREATE_DISH_FAIL, payload: err.response});
        })
};

export const setImage = (file) => dispatch => {
    dispatch({type: SET_IMAGE, payload: file})
};