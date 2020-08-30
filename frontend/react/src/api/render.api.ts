/**
 * 用于登录成功之后获取 用户信息和用户权限
 */
import request from '@/utils/request';

// 获取用户信息
export function getInfo() {
    return request.get('/getInfo');
}

// 获取用户菜单
export function getRouters() {
    return request.get('/getRouters');
}
