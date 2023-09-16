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

export const getAll = async () => {
    try {
        const url = `${baseUrl}/account`
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        return error.response.data
    }

};

export const postData = async (name, value) => {
    try {
        const url = `${baseUrl}/add`
        const response = await axios.post(url, {
            name: name,
            value: value
        });
        return response.data
    } catch (error) {
        return error.response.data
    }

};