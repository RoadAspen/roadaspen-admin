import Cookies from 'js-cookie';


// app token key
export const TokenKey = 'Admin-Token';

// 获取token值
export function getToken() {
    return Cookies.get(TokenKey);
}

// 设置token
export function setToken(token: string) {
    return Cookies.set(TokenKey, token);
}

// 删除token
export function removeToken() {
    return Cookies.remove(TokenKey);
}