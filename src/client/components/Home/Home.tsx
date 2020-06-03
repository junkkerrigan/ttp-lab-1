import React, { CSSProperties, FC, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Page } from '../Page';
import { HomeCardsList } from '../HomeCardsList';

import s from './Home.scss';
import { Redirect } from 'react-router-dom';
import { userManager } from '../../UserManager';

const pageStyles: CSSProperties = {
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '30px 200px 0',
};

export const Home: FC = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const handleLogoutBtnClick = () => {
    userManager.logOut();
    setLoggedOut(true);
  };

  return (
    <Page overrideContainerStyles={pageStyles}>
      <h1 className={s.title}>Hello!</h1>
      <p className={s.subtitle}>
        You are on your home page.
        <br />
        Here is the start point of your journey through our site.
      </p>
      <HomeCardsList />
      <button className={s.logoutBtn} onClick={handleLogoutBtnClick}>
        <LogoutOutlined />
      </button>
      {loggedOut && <Redirect to="/login" />}
    </Page>
  );
};
