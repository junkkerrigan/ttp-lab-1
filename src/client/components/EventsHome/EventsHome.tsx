import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { Event } from '../../../types/domain';
import { PlusCircleOutlined } from '@ant-design/icons';

import { List } from 'antd';
import { axiosClient } from '../../axiosClient';

import s from './EventsHome.scss';
import { EventCard } from '../EventCard';
import { NavLink } from 'react-router-dom';

export const EventsHome: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axiosClient.get<Event[]>('/events').then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return (
    <>
      <NavLink to="/events/create" className={s.addEventLink}>
        <PlusCircleOutlined />
      </NavLink>
      {events.length ? (
        <List
          dataSource={events}
          renderItem={(itemData) => {
            return (
              <List.Item>
                <EventCard {...itemData} />
              </List.Item>
            );
          }}
        />
      ) : (
        <p className={s.noEventsMessage}>
          <i>
            You have no events yet
            <span className={s.noEventsSubMessage}>
              (but it is only <b>yet</b>)
            </span>
          </i>
        </p>
      )}
    </>
  );
};
