import axios from "axios";
import {redirect} from "@sveltejs/kit";

const localURL = "http://localhost:8080/api";
const hostURL = "https://";

function createAxiosInstance() {
  let instance = axios.create({
    baseURL: localURL,
  });

  instance.interceptors.response.use(
    (response) => {return response},
    (error) => {
        if (error.response.status === 401){
            throw redirect(307, '/login')
        }
    }
  );

  return instance;
}

const axiosInstance = createAxiosInstance();

export class HttpClient {
  static get<T>(url: string, token?: string, params?: any) {
    return axiosInstance.get<T>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
  }

  static post<T>(url: string, data?: any, token?: string) {
    return axiosInstance.post<T>(
      url,
      data,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }

  static put<T>(url: string, data?: any, token?: string) {
    return axiosInstance.put<T>(
      url,
      data,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }

  static delete<T>(url: string, token?: string) {
    return axiosInstance.delete<T>(
      url,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }
}
