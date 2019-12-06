import axios from "axios";
require("dotenv").config();

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
};
