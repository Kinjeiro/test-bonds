import featureMainLayout from './features/feature-main-layout';

import moduleHome from './modules/module-home/client';
import moduleTodoList from './modules/module-todo-list/client';
import moduleBonds from './modules/module-bonds/client';

import ClientModule from './core-features/feature-uni-modules/ClientModule';

const ALL_CLIENTS_MODULES: ClientModule[] = [
  featureMainLayout,

  // MODULES
  moduleHome,
  moduleTodoList,
  moduleBonds,
];

export default ALL_CLIENTS_MODULES;
