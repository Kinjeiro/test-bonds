import withReduxRoot from './core-features/feature-redux/with-redux-root';
import withUiRoot from './core-features/feature-ui/with-ui-root';
import withRouter from './core-features/feature-router/with-router';

import MainLayout from './features/feature-main-layout/pages/MainLayout';

import ALL_CLIENTS_MODULES from './all-client-modules';

export const AppWithoutRouter =
  withReduxRoot(
    withUiRoot(
      MainLayout,
    ),
    ALL_CLIENTS_MODULES,
  );

const App =
  withRouter(
    AppWithoutRouter,
    ALL_CLIENTS_MODULES,
  );

export default App;
