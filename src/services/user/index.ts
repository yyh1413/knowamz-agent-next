// api/user.ts
import { http } from "../api-axios";

const sendVerifyCode = (data: { [key: string]: any }) => {
  return http.post("/api/agent/account/sendVerifyCode", data);
};
const restPassword = (data: { [key: string]: any }) => {
  return http.post("/api/agent/account/restPassword", data);
};
const setHandleSignup = (data: { [key: string]: any }) => {
  return http.post("/api/agent/account/register", data);
};
const login = (data: any) => {
  return http.post("/api/agent/account/login", data);
};
const handlerlogout = () => {
  return http.get("/api/agent/account/logout");
};
const getUserInfo = (data?: string) => {
  return http.get<any>(
    "/api/agent/account/getUserInfo",
    undefined,
    data ? { Authorization: data } : undefined
  );
};
const getVipPackage = (data: string) => {
  return http.get<any>("/api/agent/vipPackage/list?vipType=" + data);
};
const getSettingModel = () => {
  return http.get<any[]>("/api/agent/setting/getGptModel");
};

const getDiscountPrice = (id: string, discountCode?: any) => {
  return http.get<any>(
    `/api/agent/vipPackage/getDiscountPrice?id=${id}&discountCode=${discountCode}`
  );
};

const v2pay = (param: any) => {
  return http.post<any>(`/api/agent/v2/pay`, param, "application/x-www-form-urlencoded");
};
const savetemplate = (param: any) => {
  return http.post<any[]>(`/api/agent/custom/template/save`, param);
};
const updatetemplate = (param: any) => {
  return http.post<any>(`/api/agent/custom/template/update`, param);
};
const deletetemplate = (id: any) => {
  return http.get<any>(`/api/agent/custom/template/delete?id=` + id);
};
const getlisttemplate = () => {
  return http.get<any[]>(`/api/agent/custom/template/list`);
};
const saveSetting = (param: any) => {
  return http.post<any>(`/api/agent/setting/save`, param);
};
const getsetting = () => {
  return http.get<any>(`api/agent/setting/info`);
};

export {
  getSettingModel,
  getsetting,
  saveSetting,
  handlerlogout,
  savetemplate,
  updatetemplate,
  deletetemplate,
  getlisttemplate,
  v2pay,
  sendVerifyCode,
  getDiscountPrice,
  restPassword,
  setHandleSignup,
  login,
  getUserInfo,
  getVipPackage,
};
