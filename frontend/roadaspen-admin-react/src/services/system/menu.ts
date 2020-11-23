import request from '@/utils/request';
/**
 * 菜单表 增删改查
 */

// 获取菜单
export function getMenuList<T>(params: T) {
    return request.get('/menu/list/');
}
