/* eslint-disable prettier/prettier */
import React, { useEffect, ReactElement } from 'react';
import { Button, Row, Col, Select, Modal, Table } from 'antd';
import _axios from '@/utils/_axios';
import { RouteComponentProps } from 'react-router';
import { ColumnProps } from 'antd/lib/table';
import useConsumer, { ConsumerState, OnlyActionType } from '@/models/main/consumer.model';
import PageTab from '@/components/main/PageTab';
import PageBody from '@/components/main/PageBody';
import { PaginationConfig } from 'antd/lib/pagination';
const Option = Select.Option;

// form 表单


type Props = RouteComponentProps;

const columns: ColumnProps<ConsumerState>[] = [
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
function Consumer(props: Props): ReactElement;
function Consumer() {
    const [consumerPageState, setConsumerPageState] = useConsumer();
    const {
        current,
        pageSize,
        total,
        consumer_list,
        edit_modal_visible,
        add_modal_visible,
        username,
        table_loading,
    } = consumerPageState;
    async function handleSearch(page = 1, page_size = pageSize) {
        setConsumerPageState({
            type: 'get_table_list_data_start',
        });
        try {
            // 如果不传 page，page_size  则 取默认值
            const { data } = await _axios.get('/consumer/', {
                params: { page, page_size, username },
            });
            setConsumerPageState({
                type: 'update',
                payload: {
                    consumer_list: data?.results || [],
                    table_loading: false,
                },
            });
        } catch(error) {
            setConsumerPageState({
                type: 'update',
                payload: {
                    table_loading: false,
                },
            });
        }
    }
    useEffect(function() {
        handleSearch();
    }, []);
    function handleModalToggle(type: OnlyActionType) {
        setConsumerPageState({
            type,
        });
    }
    function addConsumer() {
        //pass
    }
    function editConsumer() {
        //pass
    }
    function handleTableChange(pagination: PaginationConfig) {
        setConsumerPageState({
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
            <PageTab title={'用户专享呵呵'} />
            <PageBody>
                <Row>
                    <Col span={24} style={{ marginBottom: 20 }}>
                        <Button
                            type='primary'
                            style={{ marginRight: 5 }}
                            onClick={() => handleModalToggle('add_modal_show')}
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
                        <Table<ConsumerState>
                            bordered={true}
                            rowKey={(record: ConsumerState) => `${record.id}`}
                            columns={columns}
                            dataSource={consumer_list}
                            pagination={pagination}
                            // onChange={handleTableChange}
                            loading={table_loading}
                        />
                    </Col>
                </Row>
                <Modal
                    title='新增账号'
                    confirmLoading={true}
                    destroyOnClose={true}
                    visible={add_modal_visible}
                    onOk={addConsumer}
                    onCancel={() => handleModalToggle('add_modal_close')}
                >
                    {/*s*/}
                </Modal>
                <Modal
                    title='编辑'
                    confirmLoading={true}
                    destroyOnClose={true}
                    visible={edit_modal_visible}
                    onOk={editConsumer}
                    onCancel={() => handleModalToggle('edit_modal_close')}
                >
                    {/*s*/}
                </Modal>
            </PageBody>
        </>
    );
}

export default Consumer;
