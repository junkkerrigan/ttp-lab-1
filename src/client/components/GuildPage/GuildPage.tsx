import { PlusCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { Guild } from '../../../types/domain';
import { axiosClient } from '../../axiosClient';
import { EventCard } from '../EventCard';

import s from './GuildPage.scss';
import { makeQuery } from '../../utils/makeQuery';
import { EventData } from '../EventsHome';
import { GuildHome } from '../GuildHome/GuildHome';
import { CreateGuild } from '../CreateGuild';

export type GuildData = Pick<Guild, 'name' | 'interestingEventIds'>;

export const GuildPage: FC = () => {
  const [guild, setGuild] = useState<GuildData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fields: (keyof GuildData)[] = ['name', 'interestingEventIds'];
    const fieldsQuery = makeQuery('field', fields);

    axiosClient.api
      .get<GuildData>(`/guilds/userGuild?${fieldsQuery}`)
      .then(({ data: guildData }) => {
        setGuild(guildData);

        const { interestingEventIds } = guildData;
        const eventIdsQuery = makeQuery('eventId', interestingEventIds);

        return axiosClient.api
          .get<EventData[]>(`/events/getByIds?${eventIdsQuery}`)
          .then(({ data }) => data);
      })
      .then((eventsData) => {
        setEvents(eventsData);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (guild) {
    return <GuildHome name={guild.name} events={events} />;
  } else {
    return <CreateGuild />;
  }
};
