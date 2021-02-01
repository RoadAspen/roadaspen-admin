import { extend } from 'umi-request';
import { routerRedux } from 'dva/router';
import { getToken } from '@/utils/auth';
import { ApiProfix, codeMsg, TokenProfix } from './config';
import { Modal, message, notification } from 'antd';
import { stringify } from 'querystring';
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any }) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMsg[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  return response;
};

const request = extend({
  errorHandler,
  prefix: ApiProfix,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

//在发起请求之前,拦截请求
request.interceptors.request.use(
  (url, options) => {
    const token = getToken();
    // 白名单
    const isWriteUrl = url.includes('captchaImage') || url.includes('login');
    // token存在
    if (token) {
      if (isWriteUrl) {
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${TokenProfix} ${token}`,
        }; // 让每个请求携带自定义token 请根据实际情况自行修改
        return {
          url,
          options: {
            ...options,
            headers,
          },
        };
      } else {
        return { url, options };
      }
    } else {
      // token 不存在

      // 如果是白名单
      if (isWriteUrl) {
        return { url, options };
      } else {
        // 不在白名单则报没有权限，直接跳转到登录页
        routerRedux.push('/login');
        return { url, options };
      }
    }
  },
  { global: true },
);

//在请求返回之后，根据返回码做相应的操作，制定一个返回码对照表
request.interceptors.response.use(async response => {
  const res = await response.clone().json();
  // 未设置状态码则默认成功状态，所有后端正常返回都为 200，相信返回码在返回的信息中展示
  const code: number = res.code || 200;
  // 获取错误信息
  const msg = res.msg || codeMsg[code] || codeMsg['default'];
  //当 返回的code为401时，需要重新登录
  if (code === 401) {
    Modal.confirm({
      title: '系统提示',
      content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      okText: '重新登录',
      cancelText: '取消',
      okType: 'primary',
      onOk() {
        // 直接跳转至 登录页面且刷新页面，避免出现多次请求验证弹窗
        location.href =
          '/login?' + stringify({ redirect: window.location.pathname });
      },
    });
  } else if (code > 401 && code < 500) {
    message.error(msg);
  }
  return res;
});

export default request;
