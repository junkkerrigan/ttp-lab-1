import React, { FC, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

import { Guild } from '../../../types/domain';
import { axiosClient } from '../../axiosClient';

import s from './CreateGuild.scss';

const layout = {
  labelCol: { offset: 2, span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export const CreateGuild: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = async (guildData: Guild) => {
    try {
      await axiosClient.api.post('/guilds', guildData);

      form.resetFields(['name', 'description']);

      setError(null);
      setMessage('New guild successfully created!');
      setTimeout(() => {
        setMessage(null);
        location.reload();
      }, 3000);
    } catch (e) {
      let badField = '';
      let createErrorMessage = (badFieldResolved: string) =>
        `Error: ${badFieldResolved} is too long.`;

      if (e.response?.data?.includes('nameTooLong')) {
        badField = 'name';
      } else if (e.response?.data?.includes('name')) {
        badField = 'name';
        createErrorMessage = (badFieldResolved) =>
          `Error: ${badFieldResolved} is busy`;
      } else if (e.response?.data?.includes('descriptionTooLong')) {
        badField = 'description';
      }

      const errorMessage = badField
        ? createErrorMessage(badField)
        : 'Something went wrong. Check your internet connection and try to resubmit.';
      setMessage(null);
      setError(errorMessage);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>
        It seems like you are not the member of any guild right now.
        <br />
        But it's easy to fix by creating your own one!
      </h1>
      <Form
        form={form}
        {...layout}
        name="create-guild"
        onFinish={handleSubmit as any}
        className={s.form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, enter guild name!' }]}
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
