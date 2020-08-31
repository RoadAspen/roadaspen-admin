import React, { ReactElement } from 'react';
import StoreContextProvider from '@/contexts/ThemeContext';
import { Router, Switch } from 'react-router-dom';
import history from '@/utils/history';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { renderRoutes } from 'react-router-config';
import routes from '@/router/index';
import UserInfoContextProvider from '@/contexts/UserInfoContext';
moment.locale('zh-cn');

enum Fruit {
    Apple,
    Orange,
}

let apple = Fruit.Apple;
let orange = Fruit.Orange;

apple = 2;
orange = 1;

// Switch 会使router 在第一次匹配到时就停止向下继续匹配
// 使用 exact 会精确匹配，但是不限定精确匹配的数量，使用Switch 只会匹配第一个符合要求的目录

const App: React.FC = (): ReactElement => {
    return (
        <ConfigProvider locale={zhCN}>
            <StoreContextProvider>
                <UserInfoContextProvider>
                    <Router history={history}>
                        {renderRoutes(routes.routes)}
                    </Router>
                </UserInfoContextProvider>
            </StoreContextProvider>
        </ConfigProvider>
    );
};

export default App;
