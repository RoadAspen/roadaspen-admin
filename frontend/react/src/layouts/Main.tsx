import React, { useState, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { renderRoutes } from 'react-router-config';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

// main 页面左右布局。采用flex， aside 宽度固定，右侧 content 宽度自适应
// content 页面上下布局， 采用 flex ，header，footer 高度固定。page 高度自适应

const Main = (props: any) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    function toggle() {
        setCollapsed((collapsed) => !collapsed);
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
            </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
            </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
            </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
          </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
