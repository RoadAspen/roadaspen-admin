// 在线人数
import React, { useEffect, ReactElement, useCallback } from 'react';
import { Button, Row, Col, Select, Modal, Table } from 'antd';
import request from '@/utils/request';
import { RouteComponentProps } from 'react-router';
import { ColumnProps } from 'antd/lib/table';
import useUser, { UserState, OnlyActionType } from '@/store/models/system/user.model';
import { PaginationConfig } from 'antd/lib/pagination';
const Option = Select.Option;

// form 表单

type Props = RouteComponentProps;

const columns: ColumnProps<UserState>[] = [
    {
        title: '账号',
        dataIndex: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },
    {
        title: '角色',
        dataIndex: 'role',
    },
    {
        title: '创建时间',
        dataIndex: 'created_at',
    },
    {
        title: '更新时间',
        dataIndex: 'updated_at',
    },
    {
        title: '失效时间',
        dataIndex: 'failured_at',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '操作',
        render() {
            return (
                <>
                    <a href=''>编辑</a>
                </>
            );
        },
    },
];
function User(props: Props): ReactElement {
    const [UserPageState, setUserPageState] = useUser();
    const {
        current,
        pageSize,
        total,
        handleType,
        user_list,
        modal_visible,
        username,
        table_loading,
    } = UserPageState;
    const handleSearch = useCallback(() => {
        return async function(page = 1, page_size = pageSize) {
            setUserPageState({
                type: 'get_table_list_data_start',
            });
            try {
                // 如果不传 page，page_size  则 取默认值
                const { data } = await request.get('/User/', {
                    params: { page, page_size, username },
                });
                setUserPageState({
                    type: 'update',
                    payload: {
                        user_list: data?.results || [],
                        table_loading: false,
                    },
                });
            } catch (error) {
                setUserPageState({
                    type: 'update',
                    payload: {
                        table_loading: false,
                    },
                });
            }
        };
    }, [pageSize, username]);
    useEffect(function() {
        handleSearch();
    }, []);
    function handleModalToggle(type: OnlyActionType, handleType: 'add' | 'edit') {
        setUserPageState({
            type,
        });
    }
    function addUser() {
        //pass
    }
    function editUser() {
        //pass
    }
    function handleTableChange(pagination: PaginationConfig) {
        setUserPageState({
            type: 'update',
            payload: {
                current: pagination.current,
                pageSize: pagination.pageSize,
            },
        });
    }
    const pagination = {
        current,
        pageSize,
        total,
        pageSizeOptions: ['10', '20', '30', '40'],
    };
    return (
        <>
            <Row>
                <Col span={24} style={{ marginBottom: 20 }}>
                    <Button
                        type='primary'
                        style={{ marginRight: 5 }}
                        onClick={() => handleModalToggle('modal_show', 'add')}
                    >
                        新增
                    </Button>
                    <Select
                        allowClear={true}
                        value={1}
                        showSearch={true}
                        onChange={(value) => {
                            console.log(value);
                        }}
                        optionFilterProp='children'
                        placeholder='选择账号搜索'
                        style={{ width: 170, marginRight: 5 }}
                    >
                        <Option value={1}>1</Option>
                    </Select>
                    <Button type='primary' onClick={() => handleSearch()}>
                        查询
                    </Button>
                </Col>
                <Col span={24} style={{ marginBottom: 20 }}>
                    <Table<UserState>
                        bordered={true}
                        rowKey={(record: UserState) => `${record.id}`}
                        columns={columns}
                        dataSource={user_list}
                        pagination={pagination}
                        // onChange={handleTableChange}
                        loading={table_loading}
                    />
                </Col>
            </Row>
            <Modal
                title={handleType === 'add' ? '新增用户' : '编辑'}
                confirmLoading={true}
                destroyOnClose={true}
                visible={modal_visible}
                onOk={addUser}
                onCancel={() => handleModalToggle('modal_close', 'add')}
            >
                {/*s*/}
            </Modal>
        </>
    );
}

export default User;
