import React, { ReactElement } from 'react';
import Logo from '@/components/main/Logo';
import { Menu } from 'antd';
import * as mainStyle from '@/assets/css/main/main.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
// import mainLinkConfig from '@/configs/main_link_config';

interface Props extends RouteComponentProps {
    collapsed: boolean;
}
function Aside(props: Props): ReactElement {
    const pathname = props.history.location.pathname;
    return (
        <div
            className={`${mainStyle.aside} ${
                props.collapsed ? mainStyle.asideCollapsed : mainStyle.asideNocollapsed
            }`}
        >
            <Logo collapsed={props.collapsed} />
            <Menu
                defaultSelectedKeys={[pathname]}
                mode='inline'
                theme='dark'
                inlineCollapsed={props.collapsed}
            >
                {/* {mainLinkConfig.map((item) => {
                    return (
                        <Menu.Item key={item.url} icon={<item.icon />}>
                            <Link to={item.url} style={{ color: 'white' }}>
                                {item.text}
                            </Link>
                        </Menu.Item>
                    );
                })} */}
            </Menu>
        </div>
    );
}

export default withRouter(Aside);
