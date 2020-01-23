import {
    GET_DISHES_START,
    GET_DISHES_SUCCESS,
    GET_DISHES_FAIL,
    SET_IMAGE,
    CREATE_DISH_START,
    CREATE_DISH_SUCCESS,
    CREATE_DISH_FAIL, GET_PROFILE_REVIEWS_START, GET_PROFILE_REVIEWS_SUCCESS, GET_PROFILE_REVIEWS_FAILURE, FILTER_DISHES
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

function fd(data, dishes) {
    for (const item in data) {
        const new_dishes = dishes.filter(dish => {
            if (dish[item] === undefined || dish[item] !== data[item]) {
                return false
            }
            return true
        });
        console.log("STEP1 ", new_dishes)
        dishes = new_dishes;
    }
}

export const filterDishes = (data) => (dispatch, getState) => {
    /*name: ""
restaurant_name: ""
location: ""
rating: "2"
cuisine: ""
price: ""*/
    let dishes = getState().dishes.dishes;
    for (const item in data) {
        console.log(typeof data['rating'])
        if (data[item] !== "") {
            const new_dishes = dishes.filter(dish => {
                if (dish[item] === undefined || String(dish[item]) !== String(data[item])) {
                    return false
                }
                return true
            });
            console.log("STEP1 ", new_dishes)
            dishes = new_dishes;
        }
    }
    // dishes = dishes.filter(dish => {
    //     for (let item in data) {
    //         console.log(dish[item] ,"  ||   ", item)
    //         if (dish[item] === undefined || dish[item] !== data[item]) {
    //             return false
    //         }
    //     }
    //     return true
    // });
    console.log("di ", dishes)
    dispatch({type: FILTER_DISHES, payload: dishes})
}