import ClientModule from '../../../ClientModule';

import MODULE_NAME from '../module-name';
import reducersMap from './redux-todo-list';
import getRoutes from './routes-todo-list';

export default ClientModule.create({
  moduleName: MODULE_NAME,
  getReduxReducers: () => reducersMap,
  getRoutes,
});
