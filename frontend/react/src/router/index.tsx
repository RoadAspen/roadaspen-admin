// 导入 组件，使用懒加载
import React, { useContext } from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { RouteConfigContext } from '@/contexts/RouteContext';
import history from '@/utils/history';

// react-route-config , 白名单，如果需要返回上一页并保持退出的状态，则需要把页面的状态信息都存入到redux或者context中

const Routers = () => {
    const [routes] = useContext(RouteConfigContext);
    return <Router history={history}>{renderRoutes(routes.routes)}</Router>;
};

export default Routers;
