import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content, Footer } = Layout;
import styles from './BasicLayout.less';

// 后台管理系统 页面左右布局。采用flex， aside 宽度固定，右侧 content 宽度自适应
// content 页面上下布局， 采用 flex ，header，footer 高度固定。page 高度自适应
const Logo = (props: { collapsed: boolean }) => {
    return (
        <div className={styles.logo}>
            {/* <img src={require("")} alt=""/> */}
            <h1>{!props.collapsed ? 'Road Aspen Admin' : 'Admin'}</h1>
        </div>
    )
}
const BasicLayout = (props: any) => {
    console.log(props);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    function toggle() {
        setCollapsed((collapsed) => !collapsed);
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Logo collapsed={collapsed} />
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1' icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key='3' icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    {collapsed ? <MenuUnfoldOutlined onClick={toggle} className={styles.trigger} /> : <MenuFoldOutlined onClick={toggle} className={styles.trigger} />}
                </Header>
                <Content className={styles.content}
                >
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>RoadAspen Admin ©2020 Created by Ant UMI</Footer>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;