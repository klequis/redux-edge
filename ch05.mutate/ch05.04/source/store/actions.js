import api from '../api';
import { v4 } from 'uuid';
import * as ku from '../../lib/ke-utils';

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
  const o = {
    request: request,
    key: key,
    start: start,
    success: success,
    failure: failure,
  };
  ku.log('createRequestThunk', o, 'red');

  return (...args) => (dispatch) => {
    ku.log('...args', args, 'red');

    // if key is a function pass it args else key
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    ku.log('requestKey', requestKey, 'red');

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args) // request is function like api.days.readList()
      .then((data) => {
        // Things to do if request succeds
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
      });
  };
};

export const replaceWeather = (weather) => ({
  type: 'app/replaceWeather',
  payload: weather,
});

export const requestReadWeather = createRequestThunk({
  request: api.days.readList,
  key: 'readWeather',
  success: [
    replaceWeather,
    (weather) => replaceWeather(weather),
  ],
});
