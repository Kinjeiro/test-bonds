import React, { ComponentType, ElementType } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

import { history } from '../feature-redux/configureStore';


import ClientModule from '../feature-uni-modules/ClientModule';

export interface WithRouterProps {
  routes: JSX.Element | (JSX.Element | undefined)[],
}

export default function withRouter(
  Component: ComponentType<WithRouterProps>,
  clientModules: ClientModule[],
  historyCustom?: History,
): ElementType {
  const routes = clientModules.map((clientModule) => clientModule.getRoutes && (
    <React.Fragment key={ clientModule.getRoutesPrefix() }>
      { clientModule.getRoutes(clientModule.getRoutesPrefix()) }
    </React.Fragment>
  ));

  function WithRouter(props: object) {
    return (
      <Router history={ historyCustom || history }>
        <Component
          { ...props }
          routes={ routes }
        />
      </Router>
    );
  }

  return WithRouter;
}
