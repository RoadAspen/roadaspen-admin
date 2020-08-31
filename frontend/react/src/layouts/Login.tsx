import React, { useState, useEffect, useCallback, useContext } from 'react';
import history from '@/utils/history';
import { Button, Form, Input, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, captchaImage } from '@/api/login.api';
import * as loginStyle from '@/assets/css/login.less';
import { UserInfoContext } from '@/contexts/UserInfoContext';

const Login = () => {
    const [state, dispatch] = useContext(UserInfoContext)
    console.log(state);
    const [form] = Form.useForm();
    // 按钮loading
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [verify, setVerify] = useState({
        uuid: '',
        href: '',
    });

    const get_verify = async () => {
        try {
            const { data } = await captchaImage();
            const href = btoa(unescape(encodeURIComponent(data.data)));
            setVerify(() => ({
                href: `data:image/svg+xml;base64,${href}`,
                uuid: data.uuid,
            }));
        } catch(error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        // DidMount 时 获取验证码图片
        get_verify();
    }, []);
    const onFinish = async <T extends {}>(values: T) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                uuid: verify.uuid,
            };
            const { data } = await login(payload);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user.username);
            setLoading(false);
            history.push('/main/consumer');
        } catch(error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={loginStyle.login_bg}>
            <div className={loginStyle.login_form_box}>
                <h1 className={loginStyle.login_title}>后台管理系统</h1>
                <Form name='login_form' form={form} layout='horizontal' onFinish={onFinish}>
                    <Form.Item
                        name='username'
                        className={loginStyle.login_input}
                        rules={[
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className={loginStyle.login_icon} />}
                            autoComplete='off'
                            placeholder='账号'
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        className={loginStyle.login_input}
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                        ]}
                    >
                        <Input.Password
                            size='large'
                            prefix={<LockOutlined className={loginStyle.login_icon} />}
                            placeholder='密码'
                        />
                    </Form.Item>
                    <Row gutter={20}>
                        <Col span={16}>
                            <Form.Item
                                name='code'
                                className={loginStyle.login_input}
                                rules={[
                                    {
                                        required: true,
                                        message: '验证码不能为空',
                                    },
                                ]}
                            >
                                <Input
                                    size='large'
                                    autoComplete='off'
                                    prefix={<LockOutlined className={loginStyle.login_icon} />}
                                    placeholder='验证码'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <img
                                    src={verify.href}
                                    alt='验证码'
                                    onClick={get_verify}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ span: 24 }} style={{ position: 'relative' }}>
                        <p
                            className={loginStyle.login_form_error}
                            style={{ display: error ? 'block' : 'none' }}
                        >
                            账号密码错误
                        </p>
                        <Button
                            loading={loading}
                            htmlType='submit'
                            className={loginStyle.login_form_btn}
                            type='primary'
                            size='large'
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={loginStyle.login_footer}>
                <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
            </div>
        </div>
    );
};

export default Login;
