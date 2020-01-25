import {
    GET_RESTAURANT_START,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAIL,
    SET_IMAGE,
    CREATE_RESTAURANT_START,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAIL,
    DELETE_RESTAURANT_START,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    FILTER_RESTAURANTS, UPDATE_RESTAURANT_START, UPDATE_RESTAURANT_SUCCESS, UPDATE_RESTAURANT_FAILURE
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import {FILTER_DISHES} from "../dishes/types";

export const getRestaurants = () => dispatch => {
    dispatch({type: GET_RESTAURANT_START});
    axiosWithAuth()
        .get("/restaurants")
        .then(res => dispatch({type: GET_RESTAURANT_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_RESTAURANT_FAIL, payload: error}))
};

export const createRestaurant = (restaurant, history) => dispatch => {
    dispatch({type: CREATE_RESTAURANT_START});
    axiosWithAuth()
        .post("/restaurants", restaurant)
        .then(res => {
            dispatch({type: CREATE_RESTAURANT_SUCCESS, payload: res.data});
            history.push('/dashboard/restaurants')
        })
        .catch(err => {
            dispatch({type: CREATE_RESTAURANT_FAIL, payload: err.response});
        })
};

export const setImage = (file) => dispatch => {
    dispatch({type: SET_IMAGE, payload: file})
};

export const deleteRestaurant = (id) => dispatch => {
    dispatch({type: DELETE_RESTAURANT_START})
    axiosWithAuth()
        .delete(`/restaurants/${id}`)
        .then(res => dispatch({type: DELETE_RESTAURANT_SUCCESS, payload: id}))
        .catch(err => dispatch({type: DELETE_RESTAURANT_FAILURE, payload: err}))
};

export const updateRestaurant = (id, changes, history) => dispatch => {
    dispatch({type: UPDATE_RESTAURANT_START});
    axiosWithAuth()
        .put(`/restaurants/${id}`, changes)
        .then(res => {
            dispatch({type: UPDATE_RESTAURANT_SUCCESS, payload: res});
            history.push(`/dashboard/restaurants/single/${id}`);
        })
        .catch(error => dispatch({type: UPDATE_RESTAURANT_FAILURE}))
};

export const filterRestaurants = (data) => (dispatch, getState) => {
    /*name: ""
    location: ""
    rating: "2"
    cuisine: ""
    */
    let restaurants = getState().restaurants.restaurants;
    for (const item in data) {
        if (data[item] !== "") {
            const new_restaurants = restaurants.filter(res => {
                if (res[item] === undefined || String(res[item]) !== String(data[item])) {
                    return false
                }
                return true
            });
            restaurants = new_restaurants;
        }
    }
    dispatch({type: FILTER_RESTAURANTS, payload: restaurants})
};