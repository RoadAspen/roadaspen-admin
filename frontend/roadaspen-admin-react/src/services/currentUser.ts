/**
 * 用于登录成功之后获取 当前用户信息（包含 用户基本信息、用户菜单、用户权限）
 */
import request from '@/utils/request';

// 获取当前用户信息
export function getCurrentUserInfo() {
    return request.get('/currentUser/getInfo/');
}

// 获取当前用户菜单
export function getCurrentUserRoutes() {
    return request.get('/currentUser/getRoutes/');
}
