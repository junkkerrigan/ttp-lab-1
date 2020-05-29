import React, { CSSProperties, FC } from 'react';

import { Page } from '../Page';

import s from './Home.scss';
import { HomeCardsList } from '../HomeCardsList';

const pageStyles: CSSProperties = {
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '30px 200px 0',
};

export const Home: FC = () => {
  return (
    <Page overrideContainerStyles={pageStyles}>
      <h1 className={s.title}>Hello!</h1>
      <p className={s.subtitle}>
        You are on your home page.
        <br />
        Here is the start point of your journey through our site.
      </p>
      <HomeCardsList />
    </Page>
  );
};
