import { Layout } from 'antd';
import React, { CSSProperties, FC } from 'react';

import s from './Page.scss';

interface PageProps {
  overrideContainerStyles?: CSSProperties;
}

export const Page: FC<PageProps> = ({ children, overrideContainerStyles }) => {
  return (
    <Layout className={s.container} style={overrideContainerStyles}>
      {children}
    </Layout>
  );
};
