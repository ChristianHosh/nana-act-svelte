import axios from "axios";
import {any} from "zod";

const localURL = 'http://localhost:8080/api';
const hostURL = 'https://';

const axiosInstance = axios.create({
    baseURL: localURL,
    validateStatus: (status) => {
        return status < 500
    }
});

export class HttpClient {
    static get<T>(url: string, token?: string, params?: any) {
        return axiosInstance.get<T>(url,  {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: params
        });
    }

    static post<T>(url: string, data?: any, token?: string) {
        return axiosInstance.post<T>(url, data, token ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {});
    }

    static put<T>(url: string, data?: any, token?: string) {
        return axiosInstance.put<T>(url, data, token ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {});
    }

    static delete<T>(url: string, data?: any, token?: string) {
        return axiosInstance.delete<T>(url, token ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {});
    }
}
