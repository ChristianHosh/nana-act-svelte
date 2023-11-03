import axios from "axios";

const localURL = "http://localhost:8080/api";
const hostURL = "https://";

function createAxiosInstance() {
  let instance = axios.create({
    baseURL: localURL,
  });

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
    return axiosInstance.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static put<T>(url: string, data?: any, token?: string) {
    return axiosInstance.put<T>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static delete<T>(url: string, token?: string) {
    return axiosInstance.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
