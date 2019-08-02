import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Store, Middleware, AnyAction } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { rootReducer, StoreInterface } from './reducers';

const _history = createBrowserHistory();

declare const module: any;

export const configureStore = (initialState?: StoreInterface): Store<{}> => {
  const store: Store<{}> = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...[
      routerMiddleware(_history),
      thunk,
    ] as Middleware[]),
  );

  if (module.hot) {
    module.hot.accept('./reducers', (): void => {
      store.replaceReducer(rootReducer as Reducer<any, AnyAction>);
    });
  }

  return store;
};

export const history = _history;
