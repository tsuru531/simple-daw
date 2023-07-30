import * as React from 'react';
import { Route, Switch } from 'react-router';
import Main from './pages/Main';

export const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path='(/)?' component={ Main } />
      <Route component={ Main } />
    </Switch>
  );
};
