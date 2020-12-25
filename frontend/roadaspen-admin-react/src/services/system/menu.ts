import request from '@/utils/request';
/**
 * 菜单表 增删改查
 */


// 获取菜单列表
export function get_menu_list<T extends {}>(params: T) {
    return request.get('/menu/list/', { params });
}

// 获取单个菜单信息
export function get_menu(data: { id: number }) {
    return request.get(`/menu/${data.id}/`);
}

// 新增菜单
export function add_menu<T>(data: T) {
    return request.post('/menu/add/', data);
}

// 编辑菜单
export function edit_menu(data: { id: number }) {
    return request.patch(`/menu/${data.id}/`, { data: data });
}

// 删除菜单
export function del_menu(data: { id: number | number[] }) {
    return request.delete(`/menu/${Array.isArray(data.id) ? data.id.join(',') : data.id}/`);
}