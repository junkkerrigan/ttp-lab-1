import React, { CSSProperties, FC, ReactNode } from 'react';
import { Page } from '../Page';

import s from './CategoryHomeLayout.scss';

interface CategoryHomeLayoutProps {
  title?: ReactNode;
  [key: string]: any;
}

const pageStyles: CSSProperties = {
  position: 'relative',
};

export const CategoryHomeLayout: FC<CategoryHomeLayoutProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <Page
      overrideContainerStyles={pageStyles}
      headerComponent={<h1 className={s.title}>{title}</h1>}
      {...props}
    >
      {children}
    </Page>
  );
};
