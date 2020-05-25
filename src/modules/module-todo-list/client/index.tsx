import ClientModule from '../../../core-features/feature-uni-modules/ClientModule';

import MODULE_NAME from '../module-name';
import reducersMap from './redux-todo-list';
import getRoutes from './routes-todo-list';
import MenuRender from './containers/MenuRenderTodoList';

export default ClientModule.create({
  moduleName: MODULE_NAME,
  getReduxReducers: () => reducersMap,
  getRoutes,
  MenuRender,
});
