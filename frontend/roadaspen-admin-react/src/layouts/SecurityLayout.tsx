/**
 * 先判断组件是否已加载，如果未加载则显示 loading， 已加载则显示
 * 判断登录，如果已登录，则直接返回children。
 * 如果未登录则返回 登陆页面。
 */
import React, { useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';

interface SecurityLayoutProps extends ConnectProps {
  token?: string | null;
  fetchUserInfo?: boolean;
  children:any;
}

const SecurityLayout = (props:SecurityLayoutProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'currentUser/fetchCurrent',
      });
      dispatch({
        type: 'currentUser/fetchMenu',
      });
    }
  }, [])
  const { children, token, fetchUserInfo } = props;
  // 获取页面的当前路径
  const redirect_path = stringify({
    redirect: window.location.pathname,
  });

  // 判断组件是否加载完成
  if (!ready) {
    return <PageLoading />;
  }

  // 判断是否存在token,如果不存在且当前路径不是登录页，则跳转至登录页
  if ((!token) && window.location.pathname !== '/login') {
    return <Redirect to={`/login?${redirect_path}`} />;
  }

  // 如果正在请求用户数据
  if (!fetchUserInfo) {
    return <PageLoading />;
  }

  return children;
}

export default connect(({ currentUser }: ConnectState) => ({
  fetchUserInfo: currentUser.fetchUserInfo,
  token: currentUser.token
}))(SecurityLayout);