import { ComponentType } from 'react';
import { Reducer } from 'redux';

export default class ClientModule {
  readonly moduleName: string;

  getRoutes?: (
    moduleRoutesPrefix: string,
    url?: URL,
  ) => JSX.Element;

  getRoutePaths?: () => {
    [key: string]: string | Function,
  };

  getModuleLayout?: ComponentType;
  getReduxReducers?: () => {
    [s: string]: Reducer,
  };
  //getReduxInitialStates?: () => {
  //  [s: string]: any,
  //};
  getModuleComponentPath?: () => Promise<string>;
  run?: () => Promise<void>;


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
