import { Form, Input, Checkbox, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { FC, useState } from 'react';

import s from './Login.scss';
import { Redirect } from 'react-router-dom';

interface LoginFields {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

const layout = {
    labelCol: { offset: 4, span: 4 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const Login: FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onFinish = (values: Store) => {
        setIsLoggedIn(true);
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={s.container}>
            <div className={s.formWrapper}>
                <h1 className={s.title}>
                    Please, provide your credentials
                    <br />
                    in the form below:
                </h1>
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
                        className={s.textInput}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className={s.textInput}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout} className={s.submitButton}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoggedIn && <Redirect to='/' />}
        </div>
    );
}