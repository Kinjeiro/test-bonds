import React from 'react';
import { Route } from 'react-router-dom';

import MODULE_NAME from '../module-name';
import { PARAM__BOND_ID } from './routes-paths';

import BondPage from './pages/BondPage/BondPage';
import BondsIndexPage from './pages/BondsIndexPage/BondsIndexPage';

export default function getModuleRoutes(modulePrefix = MODULE_NAME): JSX.Element {
  return (
    <>
      <Route
        exact={ true }
        path={ `/${modulePrefix}` }
        component={ BondsIndexPage }
      />
      <Route
        exact={ true }
        path={ `/${modulePrefix}/:${PARAM__BOND_ID}` }
        component={ BondPage }
      />
    </>
  );
}
