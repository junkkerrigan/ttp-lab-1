import { Store } from 'antd/lib/form/interface';
import React, { FC, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { RegisterForm } from '../RegisterForm';
import { Page } from '../Page';

import s from './Register.scss';
import { Typography } from 'antd';

export const Register: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmitSuccess = (values: Store) => {
    setIsLoggedIn(true);
  };

  return (
    <Page centerContent>
      <div className={s.formWrapper}>
        <h1 className={s.title}>
          Please, fill in the form below to
          <br />
          create an account:
        </h1>
        <RegisterForm onSubmit={handleFormSubmitSuccess} />
        <p className={s.loginText}>
          ...or
          <NavLink to="/login"> log in </NavLink>
          if you already have one.
        </p>
      </div>
      {isLoggedIn && <Redirect to="/" />}
    </Page>
  );
};
