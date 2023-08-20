/* eslint-disable */
import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import qs from "qs";
import { env } from "../env/client.mjs";

export interface HttpResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// let axiosTimeOut = 60 * 1000;
// axios.defaults.withCredentials = true;
// const baseURL = "http://45.32.137.231:10089";
const baseURL = env.NEXT_PUBLIC_JAVA_BACKEND;

export const instance = axios.create({
  baseURL: baseURL,
  // timeout: axiosTimeOut,
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache",
  },
});

/**
 * 添加请求拦截器
 */
instance.interceptors.request.use(
  // 在发送请求之前做些什么
  (config: any) => {
    const cookieString = localStorage.getItem("next-auth.session-token");
    if (
      config.method === "post" &&
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }

    const token = cookieString;
    if (!!token) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  // 对请求错误做些什么
  (error) => Promise.reject(error)
);
/**
 * 添加响应拦截器
 *
 */
// instance.interceptors.response.use(
//   //对响应数据做点什么
//   (response) => successHandler(response),
//   // 对响应错误做点什么
//   (error) => {
//     if (error.response.status === 401) {
//       // ssoLogout();
//     } else {
//       errorHandler(error);
//     }
//   }
// );

function decorateResponseData<T extends { [index: string]: any }>(
  res: AxiosResponse<T>
): HttpResponse<T> {
  if (res.data.hasOwnProperty("code") && res.data.hasOwnProperty("msg")) {
    return {
      msg: res.data["msg"],
      code: res.data["code"],
      data: res.data["data"] as T,
    };
  }
  return {
    msg: "",
    code: 200,
    data: (res.data as T) || res,
  };
}
/**
 *get请求
 * @param url 请求的地址
 * @param data 参数是
 */
function get<T>(url: string, data?: any, headers?: AxiosRequestHeaders) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    instance
      .get(url, {
        headers: headers,
        params: {
          ...data,
        },
      })
      .then((res) => {
        const response = decorateResponseData(res);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 * @param url 请求的地址
 * @param data 向后台传的参数
 * @param paramData 参数是数组
 */
function post<T>(url: string, data: any, contentType?: string) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    const headers = {
      // "Content-Type": contentType || "application/x-www-form-urlencoded",
      "Content-Type": contentType || "application/json",
    };
    instance
      .post(url, { ...data }, { headers })
      .then((res) => {
        const response = decorateResponseData(res);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const http = {
  get,
  post,
};
