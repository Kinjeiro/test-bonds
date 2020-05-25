import React from 'react';
import { Route } from 'react-router-dom';

import MODULE_NAME from '../module-name';
import { PARAM__BOND_ID, PATH_BONDS_INDEX } from './routes-paths';

import BondPage from './pages/BondPage/BondPage';
import BondsIndexPage from './pages/BondsIndexPage/BondsIndexPage';

export default function getModuleRoutes(modulePrefix = MODULE_NAME): JSX.Element {
  return (
    <>
      <Route
        exact={ true }
        path={ PATH_BONDS_INDEX }
        component={ BondsIndexPage }
      />
      <Route
        exact={ true }
        path={ `${PATH_BONDS_INDEX}/:${PARAM__BOND_ID}` }
        component={ BondPage }
      />
    </>
  );
}
