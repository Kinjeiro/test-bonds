Usage
```
import withRouter from './core-features/feature-router/with-router';

import MainLayout from './features/feature-main-layout/pages/MainLayout';

import ALL_CLIENTS_MODULES from './all-client-modules';

const App =
  withRouter(
    MainLayout,
    ALL_CLIENTS_MODULES,
  )
;

export default App;

```
