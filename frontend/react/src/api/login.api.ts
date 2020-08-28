/**
 * 登录 api
 */
import axios from 'axios';

// 登录， 使用初始的axios，添加 /api前缀
export function login(data: any) {
    return axios.post('/api/login/', data);
}

// 获取验证图片
export function captchaImage() {
    return axios.get('/api/captchaImage/');
}
