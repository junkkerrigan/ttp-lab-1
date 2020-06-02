import { PlusCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { Guild } from '../../../types/domain';
import { axiosClient } from '../../axiosClient';
import { EventCard } from '../EventCard';

import s from './GuildsHome.scss';

export type GuildData = Pick<Guild, 'name' | 'interestingEvents'>;

export const GuildsHome: FC = () => {
  const [events, setEvents] = useState<GuildData[]>([]);

  useEffect(() => {
    const fields: (keyof GuildData)[] = ['name', 'interestingEvents'];
    const query = fields.map((field) => `fields=${field}`).join('&');

    axiosClient.api.get<GuildData[]>(`/guilds?${query}`).then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return (
    <>
      <h1 className={s.title}>Your guild</h1>
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
