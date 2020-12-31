import React, { useEffect } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Table, Form, Input, Button, Select, Space } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
interface Props extends ConnectProps {
    dispatch: Dispatch
}

const columns = [
    {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: '权限标识',
        dataIndex: 'permissionCode',
        key: 'permissionCode',
    },
    {
        title: '组件路径',
        dataIndex: 'component',
        key: 'component',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
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

const data = [
    {
        key: 1,
        name: '系统管理',
        icon: '图标',
        order: '1',
        permissionCode: '',
        component: '',
        create_time: '',
        children: [
            {
                key: 11,
                name: '系统管理',
                icon: '图标',
                order: '1',
                permissionCode: '',
                component: '',
                create_time: '',
                children: [
                    {
                        key: 111,
                        name: '系统管理',
                        icon: '图标',
                        order: '1',
                        permissionCode: '',
                        component: '',
                        create_time: '',
                    },
                    {
                        key: 112,
                        name: '系统管理',
                        icon: '图标',
                        order: '1',
                        permissionCode: '',
                        component: '',
                        create_time: '',
                    },
                ]
            }
        ]
    },
    {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
            {
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
            },
        ],
    },
    {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
            {
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [
                    {
                        key: 1311,
                        name: 'Jim Green jr.',
                        age: 25,
                        address: 'London No. 3 Lake Park',
                    },
                    {
                        key: 1312,
                        name: 'Jimmy Green sr.',
                        age: 18,
                        address: 'London No. 4 Lake Park',
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
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
            <Form form={form} layout="inline" onFinish={onFinish}>
                <Form.Item name="title" label="菜单名称">
                    <Input />
                </Form.Item>
                <Form.Item name="statusE" label="状态">
                    <Select
                        placeholder="菜单状态"
                        allowClear
                        style={{}}
                    >
                        <Option value={1} key="1">正常</Option>
                        <Option value={0} key="0">停用</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" size="small">搜索</Button>
                    <Button htmlType="button" onClick={onReset} size="small">重置</Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                expandable={{
                    // rowExpandable: record => !record.children,
                    expandIcon: ({ expanded, onExpand, record }) => expanded ? <DownOutlined style={{fontSize:12,marginRight:5,color:'#444444'}} onClick={e => onExpand(record, e)} /> : <RightOutlined style={{fontSize:12,marginRight:5,color:'#444444'}}  onClick={e => onExpand(record, e)} />
                }}
            />
        </React.Fragment>
    );
}
export default connect()(Menu)