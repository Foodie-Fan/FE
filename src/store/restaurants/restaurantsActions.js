import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";

//login action
export const getRestaurants = () => dispatch =>{
    dispatch({type: GET_RESTAURANT_START});
    axiosWithAuth()
        .get("/restaurants")
        .then(res => dispatch({type: GET_RESTAURANT_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_RESTAURANT_FAIL, payload: error}))
};
