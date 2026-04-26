import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://69cfd6b2a4647a9fc6760d2c.mockapi.io/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;