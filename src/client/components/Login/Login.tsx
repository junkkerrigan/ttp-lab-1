import React, { FC, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { LoginForm } from '../LoginForm';
import { authManager } from '../../AuthManager';

import s from './Login.scss';
import { UserCredentials } from '../../../types/authentication';

export const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmitSuccess = async (credentials: UserCredentials) => {
    try {
      const {
        success,
        data: { incorrectFields, token },
      } = await authManager.authenticate(credentials);
      if (success) {
        authManager.saveToken(token!);
        setIsLoggedIn(true);
      } else {
        const message = incorrectFields!.includes('username')
          ? 'Error: user with such username is not found'
          : 'Error: wrong password';
        setError(message);
      }
    } catch (e) {
      setError(
        'Something went wrong, try to refresh the page or check your internet connection',
      );
    }
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
          onSubmit={handleFormSubmitSuccess}
          {...(error && { error })}
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
