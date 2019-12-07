import {combineReducers} from "redux";
import users from "./users/reducers";
import restaurants from "./restaurants/reducers";
import dishes from "./dishes/reducers";

export default combineReducers({users, restaurants, dishes});