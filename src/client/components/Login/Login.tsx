import { Form, Input, Checkbox, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { FC } from 'react';

import s from './Login.scss';

interface LoginFields {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 4 },
};

export const Login: FC = () => {
    const onFinish = (values: Store) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={s.form}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}