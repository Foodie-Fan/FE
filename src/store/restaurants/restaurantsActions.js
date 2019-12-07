import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    SET_IMAGE,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import {RES_ALL} from "../../components/dashboard/Tabs";

export const getRestaurants = () => dispatch => {
    dispatch({type: GET_RESTAURANT_START});
    axiosWithAuth()
        .get("/restaurants")
        .then(res => dispatch({type: GET_RESTAURANT_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_RESTAURANT_FAIL, payload: error}))
};

export const createRestaurant = (restaurant, back) => dispatch => {
    dispatch({type: CREATE_RESTAURANT_START});
    axiosWithAuth()
        .post("/restaurants", restaurant)
        .then(res => {
            dispatch({type: CREATE_RESTAURANT_SUCCESS, payload: restaurant});
            back(RES_ALL)
        })
        .catch(err => {
            dispatch({type: CREATE_RESTAURANT_FAIL, payload: err.response});
        })
};

export const setImage = (file) => dispatch => {
    dispatch({type: SET_IMAGE, payload: file})
};