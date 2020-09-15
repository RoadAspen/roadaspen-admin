import React, { ReactElement, useContext } from 'react';
import StoreContextProvider from '@/store/contexts/ThemeContext';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import UserInfoContextProvider from '@/store/contexts/UserInfoContext';
import RouteConfigProvider from '@/store/contexts/RouteContext';
import Routers from '@/router/index';

moment.locale('zh-cn');

const App: React.FC = (): ReactElement => {
    return (
        <React.StrictMode>
            <ConfigProvider locale={zhCN}>
                <StoreContextProvider>
                    <UserInfoContextProvider>
                        <RouteConfigProvider>
                            <Routers />
                        </RouteConfigProvider>
                    </UserInfoContextProvider>
                </StoreContextProvider>
            </ConfigProvider>
        </React.StrictMode>
    );
};

export default App;
