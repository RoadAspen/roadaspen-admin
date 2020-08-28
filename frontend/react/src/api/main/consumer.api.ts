import _axios from '../../utils/_axios';
/**
 * 提交 consumer
 */

export function get_consumer_list<T>(params: T) {
    return _axios.get('/consumers/', { params });
}

export function post_consumer<T>(data: T) {
    return _axios.post('/consumers/', data);
}

export function patch_consumer(data: { id: number }) {
    return _axios.patch(`/consumers/${data.id}/`, { data: data });
}

export function del_consumer(data: { id: number }) {
    return _axios.delete(`/consumers/${data.id}/`);
}
