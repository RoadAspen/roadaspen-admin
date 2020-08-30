import axios from 'axios';
import qs from 'qs';
import history from '@/utils/history';
const request = axios.create({
    timeout: 20000,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencode',
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    baseURL: '/dev-api',
    paramsSerializer: function(params) {
        // get 请求时 ，将参数 encodeURIComponent，将特殊字符串转换为 utf8
        return qs.stringify(params);
    },
});

let alert_index = 0;
//在发起请求之前,拦截请求
request.interceptors.request.use(
    (config) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        // 定义ajax 取消
        config.cancelToken = source.token;
        let Authorization
        if(config.url !== '/login' && config.url !== '/captchaImage') {
            Authorization = localStorage.getItem('token') || false;
        }
        // 如果token 不存在，则取消当前的请求
        if(!Authorization) {
            // 当 alert_index不为0，则清空
            if(alert_index === 0) {
                localStorage.clear();
                alert_index = 1;
                alert('用户未登陆');
            }
            source.cancel();
            history.push('/login');
            return config;
        } else {
            alert_index = 0;
        }
        config.headers['Authorization'] = `jwt ${Authorization}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//在请求返回之后，根据返回码做相应的操作
request.interceptors.response.use(
    (res) => {
        if(res.status === 401) {
            localStorage.clear();
            alert('请登陆');
            history.push('/login');
        } else if(res.status === 403) {
            localStorage.clear();
            alert('无权限，请登陆');
            history.push('/login');
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;
