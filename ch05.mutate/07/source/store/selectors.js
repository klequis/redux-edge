import * as ku from '../../lib/ke-utils';

export const getDays = (state) =>
  state.weather.days;

export const getBranding = (state) =>
  state.weather.branding;

export const getCurrentObservation = (state) =>
  state.weather.currentObservation;

export const getLocation = (state) =>
  state.weather.location;

export const getToast = (state) =>
  state.ui.toast;

export const getCity = (state) =>
  state.ui.city;

export const getRequest = (state, key) => {
  // ku.logFunction('getRequest');
  // ku.log('state', state);
  // ku.log('key', key);
  return state.requests[key] || {};
};

export const getRequests = (state) =>
  state.requests;

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
