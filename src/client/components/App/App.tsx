import React, { CSSProperties, FC } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Home } from '../Home';
import { Login } from '../Login';
import { Register } from '../Register';
import { EventsHome } from '../EventsHome';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { CreateEvent } from '../CreateEvent';
import { CategoryHomeHeaderLink } from '../CategoryHomeHeaderLink';
import { GuildPage } from '../GuildPage';
import { userManager } from '../../UserManager';
import { axiosClient } from '../../axiosClient';

const ProtectedRoute: FC<{ [key: string]: any }> = (props) => {
  if (userManager.isUserAuthenticated) {
    axiosClient.updateAuthHeader(userManager.token);
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

const CategoryRoute: FC<{
  path: string;
  [key: string]: any;
}> = ({ path, children, ...props }) => {
  return (
    <ProtectedRoute
      path={path}
      render={() => (
        <CategoryHomeLayout {...props}>{children}</CategoryHomeLayout>
      )}
    />
  );
};

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute>
          <ProtectedRoute exact path="/" component={Home} />
          <CategoryRoute
            path="/events"
            centerContent
            title={<CategoryHomeHeaderLink text="Your events" link="/events" />}
          >
            <Route exact path="/events" component={EventsHome} />
            <Route exact path="/events/create" component={CreateEvent} />
          </CategoryRoute>
          <CategoryRoute
            path="/guild"
            centerContent
            title={<CategoryHomeHeaderLink text="Your guild" link="/guild" />}
          >
            <Route exact path="/guild" component={GuildPage} />
          </CategoryRoute>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};
