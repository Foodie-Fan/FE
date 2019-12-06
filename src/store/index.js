import {combineReducers} from "redux";
import users from "./users/reducers";
import restaurants from "./restaurants/reducers";

export default combineReducers({users, restaurants});