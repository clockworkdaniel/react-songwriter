import { createStore, compose } from 'redux';
import { install } from 'redux-loop';

import rootReducer from './reducers/root-reducer';

const enhancer = compose(
  install()
);

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, enhancer);
}
