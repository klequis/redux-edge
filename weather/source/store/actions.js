import api from '../api';
import { v4 } from 'uuid';
import * as ku from '../lib/ke-utils';
const logFun = true;
const logLog = true;

export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
});

export const setToast = (message, level = 'info', id = v4() ) => ({
  type: 'app/setToast',
  payload: {
    id,
    message,
    level,
  },
});

export const clearToast = () => ({
  type: 'app/clearToast',
});

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
});

export const markRequestSuccess = (key) => ({
  type: 'app/markRequestSuccess',
  meta: { key },
});

export const markRequestFailed = (reason, key) => ({
  type: 'app/markRequestFailed',
  payload: reason,
  meta: { key },
});

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {
  logFun && ku.logFunction('createRequestThunk');
  const o = {
    request,
    key,
    start,
    success,
    failure,
  };
  logLog && ku.log('createRequestThunk.params', o);
  return (...args) => (dispatch) => {
    const requestKey = (typeof key === 'function') ? key(...args) : key;

    start.forEach((actionCreator) => dispatch(actionCreator()));
    // ku.log('requestKey', requestKey);
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
      });
  };
};

export const updateWeather = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateWeather',
  payload: {
    id,
    content,
    timestamp,
  },
});

export const requestGetWeather = createRequestThunk({
  request: api.notes.getWeather,
  key: (id) => `getWeather/${id}`,
  success: [ updateWeather, () => setToast('Note saved') ],
  failure: [ () => setToast('Couldn\'t get weather', 'warn') ],
});
