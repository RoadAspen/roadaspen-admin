/**
 * 登录 api
 */
import request from '@/utils/request';

// 登录，添加 /api前缀
export function login(data: any) {
    return request.post('/login', data);
}

// 获取验证图片
export function captchaImage() {
    return request.get('/captchaImage');
}
