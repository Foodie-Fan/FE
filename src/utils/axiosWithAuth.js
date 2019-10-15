import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: "https://buildweek-foodie1.herokuapp.com",
    headers: {
      authorization: token,
      // Remove when live
      AccessControlAllowOrigin: "http://localhost:5000",
    },
  });
};
