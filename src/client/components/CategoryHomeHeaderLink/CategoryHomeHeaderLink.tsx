import { RightOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import s from './CategoryHomeHeaderLink.scss';

interface CategoryHomeHeaderLinkProps {
  text: string;
  link: string;
}

export const CategoryHomeHeaderLink: FC<CategoryHomeHeaderLinkProps> = ({
  text,
  link,
}) => {
  return (
    <div className={s.container}>
      <NavLink to="/" className={s.homeLink}>
        Home
      </NavLink>
      <RightOutlined className={s.angleIcon} />
      <NavLink to={link} className={s.categoryLink}>
        {text}
      </NavLink>
    </div>
  );
};
