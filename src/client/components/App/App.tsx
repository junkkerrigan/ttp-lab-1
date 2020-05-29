import React, { CSSProperties, FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from '../Home';
import { Login } from '../Login';
import { Register } from '../Register';
import { EventsHome } from '../EventsHome/EventsHome';
import { CategoryHomeLayout } from '../CategoryHomeLayout';
import { CreateEvent } from '../CreateEvent';

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

const eventsContainerStyles: CSSProperties = {
  alignItems: 'flex-start',
};

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <CategoryRoute path="/events" centerContent title="Your events">
          <Route exact path="/events" component={EventsHome} />
          <Route exact path="/events/create" component={CreateEvent} />
        </CategoryRoute>
      </Switch>
    </Router>
  );
};
