import { Form, Input, Checkbox, Button } from 'antd';
import React, { FC } from 'react';
import classnames from 'classnames';

import { UserData } from '../../../types/registration';

import s from './RegisterForm.scss';

interface RegisterFormProps {
  error?: string | null;
  onSubmit(values: UserData): void;
}

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm: FC<RegisterFormProps> = ({ error, onSubmit }) => {
  const errorClassName = classnames(s.errorContainer, {
    [s.hidden]: !error,
  });

  return (
    <Form
      {...layout}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onSubmit as any}
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
      <Form.Item {...tailLayout} className={errorClassName}>
        <span className={s.error}>{error}</span>
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
  );
};
