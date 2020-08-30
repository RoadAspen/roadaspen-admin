import request from '../../utils/request';
/**
 * 提交 consumer
 */

export function get_consumer_list<T>(params: T) {
    return request.get('/consumers/', { params });
}

export function post_consumer<T>(data: T) {
    return request.post('/consumers/', data);
}

export function patch_consumer(data: { id: number }) {
    return request.patch(`/consumers/${data.id}/`, { data: data });
}

export function del_consumer(data: { id: number }) {
    return request.delete(`/consumers/${data.id}/`);
}
