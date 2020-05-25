import { Form, Input, Checkbox, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { FC, useState } from 'react';

import s from './RegisterForm.scss';

interface RegisterFormProps {
  error: string | null;
  onSubmit?(values: Store): void;
}

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm: FC<RegisterFormProps> = ({ error, onSubmit }) => {
  return (
    <Form
      {...layout}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      className={s.form}
    >
      <Form.Item label="Name" name="name" className={s.textInput}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please, enter your email!' }]}
        className={s.textInput}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please, enter your username!' }]}
        className={s.textInput}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please, enter your password!' }]}
        className={s.textInput}
      >
        <Input.Password />
      </Form.Item>
      {error !== null && error}
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout} className={s.submitButton}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
