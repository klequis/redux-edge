import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as keu from '../utils/ke-utils';
import * as c from '../utils/constants';

c.TRACE && keu.log('config store');

const logger = createLogger({ collapsed: true });

import rootReducer from './reducers';
export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
}
