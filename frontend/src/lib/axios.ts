import axios, {type AxiosInstance} from "axios";

export const axiosInstance : AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
})