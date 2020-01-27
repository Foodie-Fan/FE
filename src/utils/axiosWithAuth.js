import axios from "axios";
require("dotenv").config();

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://foodie-fan.herokuapp.com",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
};
