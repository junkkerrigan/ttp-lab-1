import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Login } from '../Login';
import { authManager } from '../../AuthManager';
import { Register } from '../Register';

export const App: FC = () => {
  return (
    <Router>
      {/* {!authService.getToken() && <Redirect to="/login" />}*/}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
};
