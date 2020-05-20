import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../Login';

export const App: FC = () => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={Login} />
            </div>
        </Router>
    )
}