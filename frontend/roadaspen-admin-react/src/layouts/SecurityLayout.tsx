/**
 * 先判断组件是否已加载，如果未加载则显示 loading， 已加载则显示
 * 判断登录，如果已登录，则直接返回children。
 * 如果未登录则返回 登陆页面。
 */
import React, { useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectStateType } from '@/models/connect';

interface SecurityLayoutProps extends ConnectProps {
	token?: string | null;
	fetchUserInfo?: boolean;
	children: any;
}

// 一级验证， 判断用户是否登录，token是否存在，以及用户信息是否已经请求成功
const SecurityLayout = (props: SecurityLayoutProps) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		console.log('SecurityLayout 挂载');
		setReady(true);
		const { dispatch, token } = props;
		if (dispatch && token) {
			dispatch({
				type: 'currentUser/fetchCurrentUserInfo',
			});
		}
		// 刷新删除token
		return () => {
			dispatch && dispatch({
				type: 'currentUser/delToken',
			})
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

export default connect(({ currentUser }: ConnectStateType) => ({
	fetchUserInfo: currentUser.fetchUserInfo,
	token: currentUser.token
}))(SecurityLayout);