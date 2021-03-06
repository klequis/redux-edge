export const getToast = (state) =>
  state.ui.toast;

export const getRequest = (state, key) =>
  state.requests[key] || {};

export const getRequests = (state) =>
  state.requests;

export const getDays = (state) =>
  state.weather.days;

export const getBranding = (state) =>
  state.weather.branding;

export const getCurrentObservation = (state) =>
  state.weather.currentObservation;

export const getLocation = (state) =>
  state.weather.location;

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
