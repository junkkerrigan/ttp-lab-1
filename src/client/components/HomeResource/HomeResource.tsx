import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import React, { FC } from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

import s from './HomeResource.scss';

export interface HomeResourceProps {
  title: string;
  titleLink: string;
  text: string;
}

export const HomeResource: FC<HomeResourceProps> = ({
  title,
  titleLink,
  text,
}) => {
  const [firstWord, ...restOfWords] = text.split(' ');
  const restOfText = restOfWords.join(' ');

  return (
    <Card
      className={s.card}
      title={
        <NavLink className={s.title} to={titleLink}>
          {title}
        </NavLink>
      }
    >
      <h4 className={s.textTitle}>
        <NavLink to={titleLink} className={s.textTitleLink}>
          <CaretRightOutlined />
          {firstWord}
        </NavLink>
      </h4>
      <p className={s.text}>{restOfText}</p>
    </Card>
  );
};
