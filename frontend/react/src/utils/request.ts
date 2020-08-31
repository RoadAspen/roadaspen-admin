import axios from 'axios';
import errorCode from './errorCode';
import { getToken } from './auth';
import { Modal, message } from 'antd';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const request = axios.create({
    baseURL: '/api',
    timeout: 10000
});

//在发起请求之前,拦截请求
request.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        if(getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

//在请求返回之后，根据返回码做相应的操作，制定一个返回码对照表
request.interceptors.response.use(
    (res) => {
        // 未设置状态码则默认成功状态，所有后端正常返回都为 200，相信返回码在返回的信息中展示
        const code: number = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default'];
        //当 返回的code为401时，需要重新登录
        if(code === 401) {
            Modal.confirm({
                title: '系统提示',
                content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                okText: '重新登录',
                cancelText: '取消',
                okType: 'primary',
                onOk() {
                    // 直接跳转至 登录页面且刷新页面，避免出现多次请求验证弹窗
                    location.href = '/login';
                }
            })
        } else if(code === 403) {
            // 如果时 500 则为服务器错误
            message.warn(msg)
            return Promise.reject(new Error(msg))
        } else if(code === 500) {
            // 如果时 500 则为服务器错误
            message.error(msg)
            return Promise.reject(new Error(msg))
        } else if(code !== 200) {
            message.error(msg)
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        let { message } = error;
        if(message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if(message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if(message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        message.error(message)
        return Promise.reject(error)
    }
);

export default request;
