import React, { ReactElement, useContext } from 'react';
import StoreContextProvider from '@/contexts/ThemeContext';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import UserInfoContextProvider from '@/contexts/UserInfoContext';
import RouteConfigProvider from '@/contexts/RouteContext';
import Routers from './Routes';
moment.locale('zh-cn');

const App: React.FC = (): ReactElement => {
    return (
        <ConfigProvider locale={zhCN}>
            <StoreContextProvider>
                <UserInfoContextProvider>
                    <RouteConfigProvider>
                        <Routers />
                    </RouteConfigProvider>
                </UserInfoContextProvider>
            </StoreContextProvider>
        </ConfigProvider>
    );
};

export default App;
