import { Layout } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, FC, ReactNode, useState } from 'react';

import s from './Page.scss';
import { HomeCardsList } from '../HomeCardsList';
import { Redirect } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons/lib';
import { userManager } from '../../UserManager';

interface PageProps {
  overrideContainerStyles?: CSSProperties;
  headerComponent?: ReactNode;
  centerContent?: boolean;
}

export const Page: FC<PageProps> = ({
  children,
  overrideContainerStyles,
  headerComponent,
  centerContent,
}) => {
  const [loggedOut, setLoggedOut] = useState(false);
  const handleLogoutBtnClick = () => {
    userManager.logOut();
    setLoggedOut(true);
  };

  const layoutContentClassName = classnames(s.container, {
    [s.centerContent]: centerContent,
  });

  return (
    <Layout>
      {headerComponent && (
        <Layout.Header className={s.header}>
          {headerComponent}
          <button className={s.logoutBtn} onClick={handleLogoutBtnClick}>
            <LogoutOutlined />
          </button>
          {loggedOut && <Redirect to="/login" />}
        </Layout.Header>
      )}
      <Layout.Content
        style={overrideContainerStyles}
        className={layoutContentClassName}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
};
