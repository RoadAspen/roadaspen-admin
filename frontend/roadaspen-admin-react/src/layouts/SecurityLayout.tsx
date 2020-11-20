/**
 * 先判断组件是否已加载，如果未加载则显示 loading， 已加载则显示
 * 判断登录，如果已登录，则直接返回children。
 * 如果未登录则返回 登陆页面。
 */
import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/currentUser';

interface SecurityLayoutProps extends ConnectProps {
  token?: string | null;
  currentUser?: CurrentUser;
  fetchUserInfo?:boolean;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'currentUser/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady} = this.state;
    const { children, token,fetchUserInfo } = this.props;
    console.log('安全组件',this.props);
    // 获取页面的当前路径
    const queryString = stringify({
      redirect: window.location.pathname,
    });

    // 判断组件是否加载完成
    if (!isReady ) {
      return <PageLoading />;
    }

     // 判断是否存在token,或者 fetchUserInfo 为false，如果不存在且当前路径不是登录页，则跳转至登录页
    if ((!token) && window.location.pathname !== '/login') {
      return <Redirect to={`/login?${queryString}`} />;
    }

    // 如果正在请求用户数据
    if(!fetchUserInfo){
      return <PageLoading />;
    }

    return children;
  }
}

export default connect(({ currentUser, global }: ConnectState) => ({
  currentUser: currentUser.currentUser,
  fetchUserInfo:currentUser.fetchUserInfo,
  token: global.token
}))(SecurityLayout);