import ClientModule from '../../../core-features/feature-uni-modules/ClientModule';

import MODULE_NAME from '../module-name';
import reducersMap from './redux-bonds';
import getRoutes from './routes-bonds';
import MenuRender from './containers/MenuRenderBonds';

export default ClientModule.create({
  moduleName: MODULE_NAME,
  getReduxReducers: () => reducersMap,
  getRoutes,
  MenuRender,
});
