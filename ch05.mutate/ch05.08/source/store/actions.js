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
  const log = true;
  const o = {
    request,
    key,
    start,
    success,
    failure,
  };
  log && ku.log('createRequestThunk', o, 'red');

  return (...args) => (dispatch) => {

    // if key is a function pass it args else key
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    log && ku.log('requestKey', requestKey, 'red');

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

/* the original one that works */
export const requestReadWeather = createRequestThunk({
  request: api.get.weather,
  key: 'readWeather',
  success: [
    replaceWeather,
    (weather) => replaceWeather(weather),
  ],
});

export const updateCity = (city) => ({
  type: 'app/updateCity',
  payload: {
    city,
  },
});

export const requestReadCity = createRequestThunk({
  request: api.get.city,
  key: 'readCity',
  success: [
    updateCity,
    (city) => updateCity(city),
  ],
});

/* you wind-up with a promise
export const requestReadWeather = (location) => {
  return () => createRequestThunk({
    request: api.days.readList({location: location}),
    key: 'readWeather',
    success: [
      replaceWeather,
      (weather) => replaceWeather(weather),
    ],
  })();
};
*/
