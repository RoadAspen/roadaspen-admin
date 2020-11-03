import React, { ReactElement } from 'react';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
// 全局用户信息
import UserInfoContextProvider from '@/store/contexts/UserInfoContext';
// 全局路由
import RouteConfigProvider from '@/store/contexts/RouteContext';
import Routers from '@/router/index';

moment.locale('zh-cn');

const App: React.FC = (): ReactElement => {
    return (
        <React.StrictMode>
            <ConfigProvider locale={zhCN}>
                <UserInfoContextProvider>
                    <RouteConfigProvider>
                        <Routers />
                    </RouteConfigProvider>
                </UserInfoContextProvider>
            </ConfigProvider>
        </React.StrictMode>
    );
};

export default App;
