import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

const api_protected = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

api_protected.interceptors.request.use(async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api_protected.interceptors.response.use(res => res, async (error) => {
    if (error.response.status === 401) {
        await auth.signOut();
    }
    return Promise.reject(error);
})

export { api_protected, api }