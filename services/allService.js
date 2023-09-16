import axios from "axios";
import { baseUrl } from "./axiosConfig";

export const loginPost = async (username, password) => {
    try {
        const url = `${baseUrl}/signin`
        const response = await axios.post(url, {
            username: username,
            password: password
        });
        return response.data
    } catch (error) {
        return error.response.data
    }

};