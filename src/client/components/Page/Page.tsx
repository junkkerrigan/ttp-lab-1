import { Layout } from 'antd';
import React, { CSSProperties, FC, ReactNode } from 'react';
import classnames from 'classnames';
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
