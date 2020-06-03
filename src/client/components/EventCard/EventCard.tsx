import React, { CSSProperties, FC, useEffect, useState } from 'react';

import { Card, List, Tag } from 'antd';

import s from './EventCard.scss';
import { EventData } from '../EventsHome';

interface EventCardProps extends Partial<EventData> {
  currentGuildName?: string;
}

const MAX_DESCRIPTION_TEXT_LENGTH = 150;

export const EventCard: FC<EventCardProps> = ({
  description,
  name,
  interestedGuildNames,
  currentGuildName,
}) => {
  let descriptionText = description?.slice(0, MAX_DESCRIPTION_TEXT_LENGTH);
  if ((description?.length || 0) > MAX_DESCRIPTION_TEXT_LENGTH) {
    descriptionText += '...';
  }

  return (
    <Card title={name} className={s.card}>
      {description && (
        <>
          <p className={s.sectionTitle}>Description:</p>
          <p className={s.description}>{descriptionText}</p>
        </>
      )}
      {currentGuildName &&
        interestedGuildNames &&
        interestedGuildNames.length > 1 && (
          <>
            <p className={s.sectionTitle}>Also interesting for guilds:</p>
            {interestedGuildNames.map((guildName) => {
              if (guildName === currentGuildName) {
                return null;
              }
              return (
                <Tag key={guildName} className={s.guildTag}>
                  {guildName}
                </Tag>
              );
            })}
          </>
        )}
      {!currentGuildName &&
        interestedGuildNames &&
        interestedGuildNames.length !== 0 && (
          <>
            <p className={s.sectionTitle}>Interesting for guilds:</p>
            {interestedGuildNames.map((guildName) => {
              return (
                <Tag key={guildName} className={s.guildTag}>
                  {guildName}
                </Tag>
              );
            })}
          </>
        )}
    </Card>
  );
};
