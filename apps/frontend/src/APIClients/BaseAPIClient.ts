import axios from "axios";

const baseAPIClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default baseAPIClient;