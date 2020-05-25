import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { FC, useState } from 'react';

import s from './Login.scss';
import { NavLink, Redirect } from 'react-router-dom';
import { LoginForm } from '../LoginForm';

export const Login: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmitSuccess = (values: Store) => {
    setIsLoggedIn(true);
    console.log('Success:', values);
  };

  const handleFormSubmitFail = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={s.container}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>
          Please, provide your account credentials
          <br />
          in the form below:
        </h1>
        <LoginForm
          onSubmitSuccess={handleFormSubmitSuccess}
          onSubmitFail={handleFormSubmitFail}
        />
        <p className={s.createAccountText}>
          ...or
          <NavLink to="/register"> create an account </NavLink>
          if you don't still have one.
        </p>
      </div>
      {isLoggedIn && <Redirect to="/" />}
    </div>
  );
};
