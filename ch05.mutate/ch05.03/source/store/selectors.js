export const getDays = (state) =>
  state.days.ids.map((id) => state.days.byId[id]);

export const getDay = (state, id) =>
  state.days.byId[id] || null;

export const getToast = (state) =>
  state.ui.toast;

export const getRequest = (state, key) =>
  state.requests[key] || {};

export const getRequests = (state) =>
  state.requests;

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
