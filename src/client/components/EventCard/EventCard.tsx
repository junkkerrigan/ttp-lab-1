import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { Event } from '../../../types/domain';

import { Card, List } from 'antd';

import s from './Events.scss';

interface EventCardProps extends Event {}

export const EventCard: FC<EventCardProps> = ({ description, name }) => {
  return (
    <Card title={name}>
      <p>{description}</p>
    </Card>
  );
};
