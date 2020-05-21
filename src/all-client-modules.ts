import featureMainLayout from './features/feature-main-layout';

import moduleHome from './modules/module-home/client';
import moduleTodoList from './modules/module-todo-list/client';

import ClientModule from './ClientModule';

const ALL_CLIENTS_MODULES: ClientModule[] = [
  featureMainLayout,

  // MODULES
  moduleHome,
  moduleTodoList,
];

export default ALL_CLIENTS_MODULES;
