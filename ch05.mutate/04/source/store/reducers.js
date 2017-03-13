import { combineReducers } from 'redux';
import { merge } from 'ramda';
import * as ku from '../../lib/ke-utils';

export const branding = (state = {}, { type, payload }) => {
  ku.logFunction('reducer.branding');
  const o = {
    state,
    type,
    payload,
  };
  ku.log('branding.params', o, 'red');

  switch (type) {
    case 'app/replaceWeather':
      return payload.branding;
    default:
      return state;
  }
};

export const days = (state = {}, { type, payload }) => {
  ku.logFunction('reducer.days');
  const o = {
    state,
    type,
    payload,
  };
  ku.log('days.params', o, 'red');
  switch (type) {
    case 'app/replaceWeather':
      return payload.days;
    default:
      return state;
  }
};

export const location = (state = {}, { type, payload }) => {
  ku.logFunction('reducer.location');
  const o = {
    state,
    type,
    payload,
  };
  ku.log('location.params', o, 'red');
  switch (type) {
    case 'app/replaceWeather':
      return payload.location;
    default:
      return state;
  }
};

export const currentObservation = (state = {}, { type, payload }) => {
  ku.logFunction('reducer.currentObservation');
  const o = {
    state,
    type,
    payload,
  };
  ku.log('currentObservation.params', o, 'red');
  switch (type) {
    case 'app/replaceWeather':
      return payload.current_observation;
    default:
      return state;
  }
};

export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/setToast':
      return payload;
    case 'app/clearToast':
      return null;
    default:
      return state;
  }
};

export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case 'app/markRequestPending':
      return merge(state, { [meta.key]: { status: 'pending', error: null } });
    case 'app/markRequestSuccess':
      return merge(state, { [meta.key]: { status: 'success', error: null } });
    case 'app/markRequestFailed':
      return merge(state, { [meta.key]: { status: 'failure', error: payload } });
    default:
      return state;
  }
};

export default combineReducers({
  weather: combineReducers({
    branding,
    days,
    location,
    currentObservation,
  }),
  ui: combineReducers({
    toast,
  }),
  requests,
});
