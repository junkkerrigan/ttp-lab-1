import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { FC, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { RegisterForm } from '../RegisterForm';

import s from './Register.scss';

export const Register: FC = () => {
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
          Please, fill in the form below to
          <br />
          create an account:
        </h1>
        <RegisterForm onSubmitSuccess={handleFormSubmitSuccess} />
        <p className={s.loginText}>
          ...or
          <NavLink to="/login"> log in </NavLink>
          if you already have one.
        </p>
      </div>
      {isLoggedIn && <Redirect to="/" />}
    </div>
  );
};
