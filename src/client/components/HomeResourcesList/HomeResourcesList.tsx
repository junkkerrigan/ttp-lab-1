import React, { FC } from 'react';
import { List } from 'antd';
import { HomeResource, HomeResourceProps } from '../HomeResource/HomeResource';

const resourcesDataList: HomeResourceProps[] = [
  {
    title: 'Events',
    text: 'Check your coming and recent events out!',
    titleLink: '',
  },
  {
    title: 'Guilds',
    text: "Check what's new in your guilds!",
    titleLink: '',
  },
  {
    title: 'Products',
    text: 'Go to products you are taking care of!',
    titleLink: '',
  },
  {
    title: 'Company dashboard',
    text: 'Know everything about what is happening in your company!',
    titleLink: '',
  },
  {
    title: 'Devices',
    text: 'Manage your devices!',
    titleLink: '',
  },
];

export const HomeResourcesList: FC = () => {
  return (
    <List
      grid={{
        gutter: 20,
        column: 3,
      }}
      dataSource={resourcesDataList}
      renderItem={(resourceData) => {
        return (
          <List.Item>
            <HomeResource {...resourceData} />
          </List.Item>
        );
      }}
    />
  );
};
