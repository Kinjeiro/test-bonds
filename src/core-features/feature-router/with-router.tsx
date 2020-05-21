import React, { ComponentType } from 'react';
import { Router } from 'react-router-dom';

import { history } from '../feature-redux/configureStore';


import ClientModule from '../../ClientModule';

export interface WithRouterProps {
  routes: JSX.Element | (JSX.Element | undefined)[],
}

export default function withRouter(Component: ComponentType<WithRouterProps>, clientModules: ClientModule[]) {
  const routes = clientModules.map((clientModule) => clientModule.getRoutes && (
    <React.Fragment key={ clientModule.getRoutesPrefix() }>
      { clientModule.getRoutes(clientModule.getRoutesPrefix()) }
    </React.Fragment>
  ));

  function WithRouter(props: object) {
    return (
      <Router history={history}>
        <Component
          { ...props }
          routes={ routes }
        />
      </Router>
    );
  }

  return WithRouter;
}
