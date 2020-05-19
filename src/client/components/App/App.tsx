import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../Login';

export const App: FC = () => {
    return (
        <Router>
            <Route exact path='/' component={Login} />
        </Router>
    )
}