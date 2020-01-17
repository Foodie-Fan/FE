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

export const getDishes = () => dispatch => {
    dispatch({type: GET_DISHES_START});
    axiosWithAuth()
        .get("/reviews/")
        .then(res => dispatch({type: GET_DISHES_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_DISHES_FAIL, payload: error}))
};

export const createDish = (dish, history) => dispatch => {
    dispatch({type: CREATE_DISH_START});
    axiosWithAuth()
        .post("/reviews", dish)
        .then(res => {
            console.log('create dish success step 1', res);
            dispatch({type: CREATE_DISH_SUCCESS, payload: dish});
            history.push('/dashboard/dishes')
        })
        .catch(err => {
            dispatch({type: CREATE_DISH_FAIL, payload: err.response});
        })
};

export const setImage = (file) => dispatch => {
    dispatch({type: SET_IMAGE, payload: file})
};