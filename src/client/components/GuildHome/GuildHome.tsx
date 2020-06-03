import { List } from 'antd';
import React, { FC } from 'react';

import { EventCard } from '../EventCard';
import { EventData } from '../EventsHome';

import s from './GuildHome.scss';

interface GuildHomeProps {
  events?: EventData[];
  name: string;
}

export const GuildHome: FC<GuildHomeProps> = ({ events, name }) => {
  return (
    <div className={s.container}>
      <h1 className={s.mainTitle}>{name}</h1>
      {(!events || events.length === 0) && (
        <p className={s.nothingHereMessage}>There's nothing here yet.</p>
      )}
      {events && events.length !== 0 && (
        <>
          <h2 className={s.title}>Events you may be interested in:</h2>
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
                  <EventCard currentGuildName={name} {...itemData} />
                </List.Item>
              );
            }}
          />
        </>
      )}
    </div>
  );
};
