import React, { ReactElement } from 'react';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

moment.locale('zh-cn');

const BasicLayout: React.FC = (props): ReactElement => {
    return (
        <React.StrictMode>
            <ConfigProvider locale={zhCN}>
                这里是layouts
               {props.children}
            </ConfigProvider>
        </React.StrictMode>
    );
};

export default BasicLayout;