import {
    GET_DISHES_START,
    GET_DISHES_SUCCESS,
    GET_DISHES_FAIL,
    SET_IMAGE,
    CREATE_DISH_START,
    CREATE_DISH_SUCCESS,
    CREATE_DISH_FAIL,
    GET_PROFILE_REVIEWS_START,
    GET_PROFILE_REVIEWS_SUCCESS,
    GET_PROFILE_REVIEWS_FAILURE,
    FILTER_DISHES,
    DELETE_DISH_START, DELETE_DISH_SUCCESS, DELETE_DISH_FAILURE
} from "./types";
import {axiosWithAuth} from "../../utils/axiosWithAuth";

export const getDishes = () => dispatch => {
    dispatch({type: GET_DISHES_START});
    axiosWithAuth()
        .get("/reviews/")
        .then(res => dispatch({type: GET_DISHES_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_DISHES_FAIL, payload: error}))
};

export const getProfileReviews = (id) => dispatch => {
    dispatch({type: GET_PROFILE_REVIEWS_START});
    axiosWithAuth()
        .get(`/reviews/all/${id}`)
        .then(res => dispatch({type: GET_PROFILE_REVIEWS_SUCCESS, payload: res.data}))
        .catch(error => dispatch({type: GET_PROFILE_REVIEWS_FAILURE, payload: error}))
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

export const deleteDish = (id) => dispatch => {
    dispatch({type: DELETE_DISH_START});
    axiosWithAuth()
        .delete(`/reviews/${id}`)
        .then(res => dispatch({type: DELETE_DISH_SUCCESS, payload: id}))
        .catch(err => dispatch({type: DELETE_DISH_FAILURE, payload: err}))
};

export const filterDishes = (data) => (dispatch, getState) => {
    /*name: ""
    restaurant_name: ""
    location: ""
    rating: "2"
    cuisine: ""
    price: ""*/
    let dishes = getState().dishes.dishes;
    for (const item in data) {
        if (data[item] !== "") {
            const new_dishes = dishes.filter(dish => {
                if (dish[item] === undefined || String(dish[item]) !== String(data[item])) {
                    return false
                }
                return true
            });
            dishes = new_dishes;
        }
    }
    dispatch({type: FILTER_DISHES, payload: dishes})
};