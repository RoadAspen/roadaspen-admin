import React, { ReactElement } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

// Switch 会使router 在第一次匹配到时就停止向下继续匹配
// 使用 exact 会精确匹配，但是不限定精确匹配的数量，使用Switch 只会匹配第一个符合要求的目录

const Root = ({ route }: RouteConfigComponentProps): ReactElement => {
    return <div>{route && renderRoutes(route.routes)}</div>;
};

export default Root;
