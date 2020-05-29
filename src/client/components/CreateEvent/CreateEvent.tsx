import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Event } from '../../../types/domain';

import s from './CreateEvent.scss';
import { axiosClient } from '../../axiosClient';
import classNames from 'classnames';

const layout = {
  labelCol: { offset: 2, span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export const CreateEvent: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = async (eventData: Event) => {
    try {
      await axiosClient.post('/events', eventData);

      form.resetFields(['name', 'description']);

      setError(null);
      setMessage('Event successfully created!');
      setTimeout(() => setMessage(null), 5000);
    } catch (e) {
      let failedField = '';
      if (e.response?.data?.includes('name')) {
        failedField = 'name';
      } else if (e.response?.data?.includes('description')) {
        failedField = 'description';
      }

      const errorMessage = failedField
        ? `Error: ${failedField} is too long.`
        : 'Something went wrong;( Try to resend form.';
      setMessage(null);
      setError(errorMessage);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Create an event:</h1>
      <Form
        form={form}
        {...layout}
        name="create-event"
        onFinish={handleSubmit as any}
        className={s.form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, enter event name!' }]}
          className={s.input}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea className={s.textArea} />
        </Form.Item>
        <Form.Item {...tailLayout} className={s.submitButton}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
        {!message && !error && (
          <Form.Item {...tailLayout} className={s.fakeMessageContainer}>
            {}
          </Form.Item>
        )}
        {message && (
          <Form.Item {...tailLayout}>
            <div className={s.successMessage}>{message}</div>
          </Form.Item>
        )}
        {error && (
          <Form.Item {...tailLayout}>
            <div className={s.errorMessage}>{error}</div>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
