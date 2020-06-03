import React, { FC } from 'react';
import { List } from 'antd';
import { HomeCard, HomeCardProps } from '../HomeCard/HomeCard';

const cardsDataList: HomeCardProps[] = [
  {
    title: 'Events',
    text: 'Check your coming and recent events out!',
    titleLink: '/events',
  },
  {
    title: 'Guild',
    text: "Check what's new in your guild!",
    titleLink: '/guild',
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

export const HomeCardsList: FC = () => {
  return (
    <List
      grid={{
        gutter: 20,
        column: 3,
      }}
      dataSource={cardsDataList}
      renderItem={(resourceData) => {
        return (
          <List.Item>
            <HomeCard {...resourceData} />
          </List.Item>
        );
      }}
    />
  );
};
