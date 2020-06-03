import React, { FC, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { UserData } from '../../../types/registration';
import { RegistrationError, userManager } from '../../UserManager';
import { RegisterForm } from '../RegisterForm';
import { Page } from '../Page';

import s from './Register.scss';

export const Register: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmitSuccess = async (data: UserData) => {
    try {
      await userManager.register(data);
      setIsLoggedIn(true);
    } catch (e) {
      if (e instanceof RegistrationError) {
        if (e.message) {
          setError('Error: please, enter valid email');
        } else {
          if (e.badField === 'email') {
            setError('Error: email is busy');
          } else if (e.badField === 'username') {
            setError('Error: username is busy');
          } else {
            setError(
              'Something went wrong, try to refresh the page or check your internet connection',
            );
          }
        }
      }
    }
  };

  return (
    <Page centerContent>
      <div className={s.formWrapper}>
        <h1 className={s.title}>
          Please, fill in the form below to
          <br />
          create an account:
        </h1>
        <RegisterForm
          onSubmit={handleFormSubmitSuccess}
          {...(error && { error })}
        />
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
