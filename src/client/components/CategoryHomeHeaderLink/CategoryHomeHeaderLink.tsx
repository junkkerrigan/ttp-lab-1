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
    <NavLink to={link} className={s.link}>
      {text}
    </NavLink>
  );
};
