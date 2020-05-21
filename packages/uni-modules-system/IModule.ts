export default interface IModule<T> {
  readonly moduleName: string;
  run?: (handler: T) => Promise<void>;
}
