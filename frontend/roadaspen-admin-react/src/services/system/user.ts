import request from '@/utils/request';
/**
 * 用户表 增删改查
 */

// 获取用户列表
export function get_user_list<T extends {}>(params: T) {
    return request.get('/user/list/', { params });
}

// 获取单个用户信息
export function get_user(data: { id: number }) {
    return request.get(`/user/${data.id}/`);
}

// 新增用户
export function add_user<T>(data: T) {
    return request.post('/user/add/', data);
}

// 编辑用户
export function edit_user(data: { id: number }) {
    return request.patch(`/user/${data.id}/`, { data: data });
}

// 删除用户
export function del_user(data: { id: number | number[] }) {
    return request.delete(`/user/${Array.isArray(data.id) ? data.id.join(',') : data.id}/`);
}
