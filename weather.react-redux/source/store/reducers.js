import { combineReducers } from 'redux';
import * as keu from '../utils/ke-utils';
import * as c from '../utils/constants';

export const main = (state = {}, { type, meta, payload, error }) => {
  const o = {
    type,
    meta,
    payload,
    error,
  };
  keu.log('reducer', o);
  switch (type) {
    case c.FETCH_WEATHER:
      if (meta.done && !error) {
        return payload;
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  main,
});
