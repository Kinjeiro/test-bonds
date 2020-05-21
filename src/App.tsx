import withReduxRoot from './core-features/feature-redux/with-redux-root';
import withUiRoot from './core-features/feature-ui/with-ui-root';
import withRouter from './core-features/feature-router/with-router';

import MainLayout from './features/feature-main-layout/pages/MainLayout';

import ALL_CLIENTS_MODULES from './all-client-modules';

const App =
  withReduxRoot(
    withUiRoot(
      withRouter(
        MainLayout,
        ALL_CLIENTS_MODULES,
      ),
    ),
    ALL_CLIENTS_MODULES,
  );

export default App;
