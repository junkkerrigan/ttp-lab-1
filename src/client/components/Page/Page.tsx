import { Layout } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, FC, ReactNode } from 'react';

import s from './Page.scss';

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
  const layoutContentClassName = classnames(s.container, {
    [s.centerContent]: centerContent,
  });

  return (
    <Layout>
      {headerComponent && <Layout.Header>{headerComponent}</Layout.Header>}
      <Layout.Content
        style={overrideContainerStyles}
        className={layoutContentClassName}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
};
