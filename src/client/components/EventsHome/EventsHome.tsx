import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { Event, Guild } from '../../../types/domain';
import { PlusCircleOutlined } from '@ant-design/icons';

import { List } from 'antd';
import { axiosClient } from '../../axiosClient';

import s from './EventsHome.scss';
import { EventCard } from '../EventCard';
import { NavLink } from 'react-router-dom';

export type EventData = Pick<
  Event,
  'name' | 'description' | 'interestedGuildNames'
>;

export const EventsHome: FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fields: (keyof EventData)[] = [
      'name',
      'description',
      'interestedGuildNames',
    ];
    const query = fields.map((field) => `fields=${field}`).join('&');

    axiosClient.get<EventData[]>(`/events?${query}`).then(({ data }) => {
      setEvents(data);
    });
  }, []);

  console.log(events);
  return (
    <>
      <NavLink to="/events/create" className={s.addEventLink}>
        <PlusCircleOutlined />
      </NavLink>
      {events.length ? (
        <>
          <List
            grid={{
              gutter: 20,
              column: 4,
            }}
            className={s.eventsList}
            dataSource={events}
            renderItem={(itemData) => {
              return (
                <List.Item>
                  <EventCard {...itemData} />
                </List.Item>
              );
            }}
          />
        </>
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
