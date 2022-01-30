import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL,
});

if (process.env.REACT_APP_GITHUB_TOKEN) {
  api.defaults.headers.common[
    "Authorization"
  ] = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
}

export default api;
