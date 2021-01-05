import React, { useEffect } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Table, Form, Input, Button, Select, Space, Row, Col, Modal, TreeSelect, Radio } from 'antd';
import { DownOutlined, PlusOutlined, RightOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { MenuType, MenuModelState } from '@/models/system/menu';
import { ConnectStateType } from '@/models/connect';
import { ColumnsType } from 'antd/es/table';
import FormItemWidthHalfContainer from '@/components/FormItemWidthHalfContainer';

const { Option } = Select;

const { TreeNode } = TreeSelect;
interface Props extends ConnectProps, MenuModelState {
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
const Menu: React.FC<Props> = (props) => {
    const { dispatch, menuList, visible } = props;
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
    const onClickAdd = () => {
        dispatch({
            type: 'menu/update',
            payload: {
                visible: true
            }
        })
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={24} >
                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <Form.Item name="title" label="菜单名称" style={{ marginBottom: 10 }}>
                            <Input placeholder="请输入菜单名称" />
                        </Form.Item>
                        <Form.Item name="status" label="状态" style={{ marginBottom: 10 }}>
                            <Select
                                placeholder="菜单状态"
                                allowClear
                                style={{ width: 200 }}
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
                    <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        icon={<PlusOutlined />}
                        size="small"
                        onClick={onClickAdd}
                    >新增</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={menuList}
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
                }}
            />
            <Modal
                title="新增菜单"
                visible={visible}
            >
                <Form >
                    <Form.Item name="parent" label="上级菜单">
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={1}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="选择上级菜单"
                            allowClear
                            treeDefaultExpandAll
                        >
                            <TreeNode value="1" title="主类目">
                                <TreeNode value="parent 1-0" title="parent 1-0">
                                    <TreeNode value="leaf1" title="my leaf" />
                                    <TreeNode value="leaf2" title="your leaf" />
                                </TreeNode>
                                <TreeNode value="parent 1-1" title="parent 1-1">
                                    <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                                </TreeNode>
                            </TreeNode>
                        </TreeSelect>
                    </Form.Item>
                    <Form.Item name="menuType" label="菜单类型">
                        <Radio.Group name="menuType" value={1}>
                            <Radio value={1}>目录</Radio>
                            <Radio value={2}>菜单</Radio>
                            <Radio value={3}>按钮</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="icon" label="菜单图标">
                        <Select
                            placeholder="选择菜单图标"
                        >

                        </Select>
                    </Form.Item>
                    <FormItemWidthHalfContainer>
                        <Form.Item name="menuName" label="菜单名称" style={{ width: '48%'}}>
                            <Input placeholder="请输入菜单名称" />
                        </Form.Item>
                        <Form.Item name="menuOrder" label="显示排序" style={{ width: '48%' }}>
                            <Input type='number' placeholder="显示排序" />
                        </Form.Item>
                        <Form.Item name="isFrame" label="是否外链" style={{ width: '48%', display: 'inline-flex' }}>
                            <Radio.Group name="isFrame" value={1}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="path" label="路由地址" style={{ width: '48%' }}>
                            <Input placeholder="请输入菜单名称" />
                        </Form.Item>
                        <Form.Item name="component" label="组件路径" style={{ width: '48%' }}>
                            <Input placeholder="请输入组件路径" />
                        </Form.Item>
                        <Form.Item name="permissionCode" label="权限标识" style={{ width: '48%' }}>
                            <Input placeholder="请输入权限标识" />
                        </Form.Item>
                        <Form.Item name="show" label="显示状态" style={{ width: '48%' }}>
                            <Radio.Group name="show" value={1}>
                                <Radio value={1}>显示</Radio>
                                <Radio value={2}>隐藏</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="status" label="菜单状态" style={{ marginBottom: 10, width: '48%' }}>
                            <Radio.Group name="status" value={1}>
                                <Radio value={1}>正常</Radio>
                                <Radio value={2}>停用</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="isCache" label="是否缓存" style={{ marginBottom: 10, width: '48%' }}>
                            <Radio.Group name="isCache" value={1}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </FormItemWidthHalfContainer>
                </Form>
            </Modal>
        </React.Fragment>
    );
}
export default connect(({ menu, loading }: ConnectStateType) => {
    return {
        ...menu,
        loading
    }
})(Menu)