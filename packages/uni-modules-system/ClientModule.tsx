import { ComponentType } from 'react';
import { Router } from 'react-router';

import IModule from './IModule';
import Handler from './Handler';

export default class ClientModule implements IModule<Handler> {
  readonly moduleName: string;

  getRoutes?: (
    moduleRoutesPrefix: string,
    routeHandler: Handler,
    url: URL,
  ) => Router[];
  //getRoutesPrefix?: () => string;

  getRoutePaths?: () => {
    [key: string]: string | Function,
  };


  getModuleLayout?: ComponentType;
  getReduxReducers?: (clientHandler: Handler) => Promise<{
    [s: string]: (state: any, action: object) => any,
  }>;
  getReduxInitialStates?: (clientHandler: Handler) => Promise<{
    [s: string]: any,
  }>;
  getModuleComponentPath?: (clientHandler: Handler) => Promise<string>;
  run?: (clientHandler: Handler) => Promise<void>;


  protected constructor(moduleParts:Partial<ClientModule>) {
    this.moduleName = moduleParts.moduleName!;
    Object.assign(this, moduleParts);
  }

  getRoutesPrefix(): string {
    return this.moduleName;
  }

  static create(moduleParts: Partial<ClientModule>): ClientModule {
    return new ClientModule(moduleParts);
  }
}
