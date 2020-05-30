import React, { CSSProperties, FC } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import { Home } from '../Home';
import { Login } from '../Login';
import { Register } from '../Register';
import { EventsHome } from '../EventsHome/EventsHome';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { CreateEvent } from '../CreateEvent';
import { CategoryHomeHeaderLink } from '../CategoryHomeHeaderLink';

const CategoryRoute: FC<{
  path: string;
  [key: string]: any;
}> = ({ path, children, ...props }) => {
  return (
    <Route
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
        <Route exact path="/" component={Home} />
        <CategoryRoute
          path="/events"
          centerContent
          title={<CategoryHomeHeaderLink text="Your events" link="/events" />}
        >
          <Route exact path="/events" component={EventsHome} />
          <Route exact path="/events/create" component={CreateEvent} />
        </CategoryRoute>
      </Switch>
    </Router>
  );
};
