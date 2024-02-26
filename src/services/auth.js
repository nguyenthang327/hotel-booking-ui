import http from "@/utils/http";

const PATH = 'auth/';

export const login = (params = {}) => http.post(PATH + 'login', params);

export const logout = (params = {}) => http.post(PATH + 'logout', params);

export const refresh = (params = {}) => http.post(PATH + 'refresh', params);

export const me = (params = {}) => http.post(PATH + 'me', params);

export const register = (params = {}) => http.post(PATH + 'register', params);
