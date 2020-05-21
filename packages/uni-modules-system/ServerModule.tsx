import IModule from './IModule';
import Handler from './Handler';

export default class ServerModule implements IModule<Handler> {
  readonly moduleName: string;

  run?: (serverHandler: Handler) => Promise<void>;

  protected constructor(moduleParts: Partial<ServerModule>) {
    this.moduleName = moduleParts.moduleName!;
    Object.assign(this, moduleParts);
  }

  static create(moduleParts: Partial<ServerModule>): ServerModule {
    return new ServerModule(moduleParts);
  }
}
