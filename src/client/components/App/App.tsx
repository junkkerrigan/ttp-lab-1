import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Login } from '../Login';
import { authService } from '../../AuthManager';

export const App: FC = () => {
  return (
    <Router>
      {!authService.getToken() && <Redirect to="/login" />}
      <Route exact path="/login" component={Login} />
    </Router>
  );
};
