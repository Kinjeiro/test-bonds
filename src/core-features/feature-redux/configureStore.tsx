import { createBrowserHistory } from 'history';
import * as localforage from 'localforage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';

import ClientModule from '../feature-uni-modules/ClientModule';

const persistConfig: PersistConfig<any> = {
	key: 'root',
	version: 1,
	storage: localforage,
	blacklist: [],
};

const logger = (createLogger as any)();
const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

// ======================================================
// MIDDLEWARE
// ======================================================
const middlewarePlugins = [
  //thunk,
  promiseMiddleware,
];
if (dev) {
  middlewarePlugins.push(logger);
}

let middleware = applyMiddleware(...middlewarePlugins);
if (dev) {
	middleware = composeWithDevTools(middleware);
}



export { history };

export default function configureStore(clientModules: ClientModule[]) {
  const rootReducer = combineReducers(
    clientModules.reduce(
      (result, clientModules) => {
        if (clientModules.getReduxReducers) {
          Object.assign(result, clientModules.getReduxReducers());
        }
        return result;
      },
      {},
    ),
  );

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, {}, middleware) as any;
  const persistor = persistStore(store);
  return { store, persistor };
}
