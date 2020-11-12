import { TokenKey } from './config';


// 获取token值
export function getToken() {
    return localStorage.getItem(TokenKey);
}

// 设置token
export function setToken(token: string) {
    return localStorage.setItem(TokenKey, token);
}

// 删除token
export function removeToken() {
    return localStorage.removeItem(TokenKey);
}