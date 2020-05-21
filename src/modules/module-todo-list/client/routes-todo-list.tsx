import React from 'react';
import { Route } from 'react-router-dom';

import TodoPage from './pages/TodoPage';
import MODULE_NAME from '../module-name';

export default function getModuleRoutes(modulePrefix = MODULE_NAME): JSX.Element {
  return (
    <>
      <Route
        exact={ true }
        path={ `/${modulePrefix}` }
        component={ TodoPage }
      />
    </>
  );
}
