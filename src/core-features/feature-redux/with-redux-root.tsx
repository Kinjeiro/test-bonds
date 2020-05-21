import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Typography } from '@material-ui/core';

import configureStore from './configureStore';
import ClientModule from '../../ClientModule';

export default function withReduxRoot(Component: any, clientModules: ClientModule[]) {
  const { persistor, store } = configureStore(clientModules);

  function WithRedux(props: object) {
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <Typography>Loading...</Typography>
          }
          persistor={ persistor }
        >
          <Component { ...props } />
        </PersistGate>
      </Provider>
    );
  }
  return WithRedux;
}
