import axios from "axios";

const BASE_URL = "http://15.165.185.157:8080";

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      // "Content-Type": "application/json",
      // "X-CSRFToken": csrftoken,
    },
    // ...options,
  });
  return instance;
};


// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmltYWRlQGdtYWlsLmNvbSIsImlkIjoidW5pbWFkZUBnbWFpbC5jb20iLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzIyOTIzMzQ2LCJleHAiOjE3MjU1MTUzNDZ9.FEeKzZBLP90UZwxfOKV2fOL-sGN7OZwPQvwbQ9wwjwc";
  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
