Usage
```
import withUiRoot from './core-features/feature-ui/with-ui-root';

const App =
    withUiRoot(
      withRouter(
        MainLayout,
        ALL_CLIENTS_MODULES,
      ),
    );

export default App;

```
