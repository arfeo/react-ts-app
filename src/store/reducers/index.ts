import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { app } from './app';

export interface StoreInterface {
  router: RouterState;
  app: any;
}

export const rootReducer = combineReducers({
  router: routerReducer,
  app,
});
