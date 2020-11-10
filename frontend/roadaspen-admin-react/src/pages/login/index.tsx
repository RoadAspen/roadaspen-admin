import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Form, Input, Row, Col, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { routerRedux } from 'dva/router';
import { login, captchaImage } from '@/api/login.api';
import * as loginStyle from './login.less';
import { TokenKey } from '@/utils/auth';
const Login = () => {
    const [form] = Form.useForm();

    // 按钮loading
    const [loading, setLoading] = useState(false);
    // 当登录成功之后需要获取 route 和 userinfo 和 permissions， 之后跳转至main
    const [captcha_image, setCaptchaImage] = useState({
        uuid: '',
        href: '',
    });
    const getCookie = () => {
        // 当组件挂载时，获取cookie 中存储的 账号密码和remember
        const username = Cookies.get('username');
        const password = Cookies.get('password');
        const rememberMe = Cookies.get('rememberMe');
    };

    const get_captchaImage = async () => {
        // 获取验证码
        try {
            const {data} = await captchaImage();
            const href = btoa(unescape(encodeURIComponent(data.data)));
            setCaptchaImage(() => ({
                href: `data:image/svg+xml;base64,${href}`,
                uuid: data.uuid,
            }));
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        // DidMount 时 获取验证码图片
        console.log('执行一次');
        get_captchaImage();
        getCookie();
    }, []);
    const onFinish = async (values: { [a: string]: string }) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                uuid: captcha_image.uuid,
            };
            // 如果记住密码，则将 用户输入的账号密码存入cookie中，并设置过期时间
            if (values.remmberMe) {
                Cookies.set('username', values.username, { expires: 30 });
                Cookies.set('password', values.password, { expires: 30 });
                Cookies.set('rememberMe', values.rememberMe, { expires: 30 });
            }
            // 登录
            const data = await login(payload);

            Cookies.set(TokenKey, 'Bearea ' + (data as any).token);
            setLoading(false);
            // 成功之后 跳转到 根路径， 根路径通过判断token来决定跳转至login还是index
            routerRedux.push('/');
        } catch (error) {
            message.error('');
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
                                    src={captcha_image.href}
                                    alt='验证码'
                                    onClick={get_captchaImage}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name='rememberMe' valuePropName='checked'>
                        <Checkbox style={{ color: '#606266', fontSize: '14px' }}>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
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
                <span>Copyright © 2018-2020 roadaspen All Rights Reserved.</span>
            </div>
        </div>
    );
};

export default Login;
