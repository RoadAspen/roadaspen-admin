import React, { useState } from 'react';
import { Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { connect, ConnectProps, Dispatch, Link } from 'umi';
import TagContainer from '@/components/tagContainer';
const { Header, Sider, Content } = Layout;

// 后台管理系统 页面左右布局。采用flex， aside 宽度固定，右侧 content 宽度自适应
// content 页面上下布局， 采用 flex ，header，footer 高度固定。page 高度自适应
const Logo = (props: { collapsed: boolean }) => {
    return (
        <div className={styles.logo}>
            {/* <img src={require("")} alt=""/> */}
            <h1>{!props.collapsed ? 'RoadAspen' : 'Admin'}</h1>
        </div>
    )
}

interface Props extends ConnectProps{
    dispatch:Dispatch
}

const BasicLayout:React.FC<Props> = (props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { dispatch } = props;
    function toggle() {
        setCollapsed((collapsed) => !collapsed);
    }

    function addTag<T>(item:T){
        dispatch({
            type:'tag/addTag',
            payload:item
        })
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Logo collapsed={collapsed} />
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['/system/user']} defaultOpenKeys={['sub1']}>
                    <Menu.Item key='0' icon={<UserOutlined />}>
                        <Link to="/index">首页</Link>
                    </Menu.Item>
                    <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="系统管理">
                        <Menu.Item key='/system/user' icon={<UserOutlined />}>
                            <Link to="/system/user" onClick={()=>addTag({path:'/system/user',title:'用户管理',del:true})}>用户管理</Link>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                            <Link to="/system/role">角色管理</Link>
                        </Menu.Item>
                        <Menu.Item key='3' icon={<UploadOutlined />}>
                            <Link to="/system/menu">菜单管理</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    {collapsed ? <MenuUnfoldOutlined onClick={toggle} className={styles.trigger} /> : <MenuFoldOutlined onClick={toggle} className={styles.trigger} />}
                    {/* <Breadcrumb className={styles.breadcrumb}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                </Header>
                <TagContainer />
                <Content className={styles.content}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default connect()(BasicLayout);