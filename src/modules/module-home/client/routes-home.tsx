import React from 'react';
import { Route } from 'react-router-dom';

import MODULE_NAME from '../module-name';
import HomePage from './pages/HomePage';

export default function getModuleRoutes(modulePrefix = MODULE_NAME): JSX.Element {
  return (
    <>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/home" component={HomePage} />
    </>
  );
}
