import React, { ElementType } from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import withRouter from './core-features/feature-router/with-router';

import ALL_CLIENTS_MODULES from './all-client-modules';
import { AppWithoutRouter } from './App';


export function getAppTest(route = '/'): ElementType {
  return withRouter(
    AppWithoutRouter,
    ALL_CLIENTS_MODULES,
    createMemoryHistory({ initialEntries: [route] }),
  )
}

export default function renderTestApp(route = '/') {
  //const result = render(
  //  <MemoryRouter
  //    initialEntries={[pathToBond(BONDS.US910047AG49.Isin)]}
  //    initialIndex={0}
  //  >
  //    <AppWithoutRouter />
  //  </MemoryRouter>
  //);

  const AppTest = getAppTest(route);
  return render(
    <AppTest />
  );
}
