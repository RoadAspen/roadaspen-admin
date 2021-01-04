import React, { useEffect } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Table, Form, Input, Button, Select, Space, Row, Col, Modal } from 'antd';
import { DownOutlined, PlusOutlined, RightOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Menu as MenuType } from '@/models/system/menu';
import { ConnectState } from '@/models/connect';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;
interface Props extends ConnectProps {
    dispatch: Dispatch
}
const columns: ColumnsType<MenuType> = [
    {
        title: '菜单名称',
        dataIndex: 'menuName',
    },
    {
        title: '图标',
        dataIndex: 'icon',
    },
    {
        title: '排序',
        dataIndex: 'menuOrder',
    },
    {
        title: '权限标识',
        dataIndex: 'permissionCode',
    },
    {
        title: '路由地址',
        dataIndex: 'path',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
    },
    {
        title: '操作',
        render() {
            return <Space size="middle">
                <a>修改</a>
                <a>新增</a>
                <a>删除</a>
            </Space>
        }
    },
];

const data: MenuType[] = [
    {
        key: 'asd',
        menuName: '系统管理',
        icon: '图标',
        menuOrder: 1,
        menuType: 'dirt',
        show: true,
        status: 1,
        children: [
            {
                key: '11',
                menuName: '系统管理',
                icon: '图标',
                path: 'system',
                menuOrder: 1,
                menuType: 's',
                show: true,
                children: [
                    {
                        key: '111',
                        menuName: '系统管理',
                        icon: '图标',
                        menuOrder: 1,
                        menuType: 's',
                        show: true
                    },
                    {
                        key: '112',
                        menuName: '系统管理',
                        icon: '图标',
                        menuOrder: 1,
                        menuType: 's',
                        show: true
                    },
                ]
            },
            {
                key: '12',
                menuName: '系统管理',
                icon: '图标',
                menuOrder: 1,
                menuType: 's',
                show: true,
                children: [
                    {
                        key: '111',
                        menuName: '系统管理',
                        icon: '图标',
                        menuOrder: 1,
                        menuType: 's',
                        show: true
                    },
                    {
                        key: '112',
                        menuName: '系统管理',
                        icon: '图标',
                        menuOrder: 1,
                        menuType: 's',
                        show: true
                    },
                ]
            }
        ]
    }
];

const Menu: React.FC<Props> = (props) => {
    const { dispatch } = props;
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };
    useEffect(() => {
        dispatch({
            type: 'menu/getMenuList'
        })
    }, [])
    return (
        <React.Fragment>
            <Row>
                <Col span={24} >
                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <Form.Item name="title" label="菜单名称" style={{ marginBottom: 10 }}>
                            <Input placeholder="菜单名称" size="small"/>
                        </Form.Item>
                        <Form.Item name="status" label="状态" style={{ marginBottom: 10 }}>
                            <Select
                                placeholder="菜单状态"
                                allowClear
                                style={{ width: 200 }}
                                size="small"
                            >
                                <Option value={1} key="1">正常</Option>
                                <Option value={0} key="0">停用</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 10 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 15 }} icon={<SearchOutlined />} size="small">搜索</Button>
                            <Button htmlType="button" onClick={onReset} icon={<SyncOutlined />} size="small">重置</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24} style={{ marginBottom: 10 }}>
                    <Button type="primary"  size="small" style={{ marginRight: 15 }} icon={<PlusOutlined />}>新增</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                expandable={{
                    rowExpandable: (record) => {
                        if (record.children) {
                            return true
                        }
                        return false
                    },
                    expandIcon: ({ expanded, onExpand, record }) => {
                        if (record.children)
                            if (record.children.length > 0) {
                                return expanded ? <DownOutlined style={{ fontSize: 12, marginRight: 5, color: '#444444' }} onClick={e => onExpand(record, e)} /> : <RightOutlined style={{ fontSize: 12, marginRight: 5, color: '#444444' }} onClick={e => onExpand(record, e)} />
                            }
                    }
                }

                }
            />
        </React.Fragment>
    );
}
export default connect((store: ConnectState) => {
    return {
        menu: store.menu
    }
})(Menu)