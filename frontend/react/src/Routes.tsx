import React, { useContext } from 'react';
import { Router } from 'react-router-dom';
import history from '@/utils/history';
import { renderRoutes } from 'react-router-config';
import { RouteConfigContext } from '@/contexts/RouteContext';

const Routers = () => {
    const [routes] = useContext(RouteConfigContext);
    return <Router history={history}>{renderRoutes(routes.routes)}</Router>;
};

export default Routers;
