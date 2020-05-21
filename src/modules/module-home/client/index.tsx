import ClientModule from '../../../ClientModule';

import MODULE_NAME from '../module-name';
import getRoutes from './routes-home';

export default ClientModule.create({
  moduleName: MODULE_NAME,
  getRoutes,
});
