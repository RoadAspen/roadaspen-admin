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
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children,  currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = false;
    //  currentUser && currentUser.userid;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin ) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/login') {
      return <Redirect to={`/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ currentUser}: ConnectState) => ({
  currentUser: currentUser.currentUser
}))(SecurityLayout);