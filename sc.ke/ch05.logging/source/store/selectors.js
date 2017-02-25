import * as ku from '../lib/ke-utils';
const logFun = false;
const logLog = false;

export const getNotes = (state) => {
  // logFun && ku.logFunction('selectors.getNoes');
  return state.notes.ids.map((id) => state.notes.byId[id]);
};

export const getNote = (state, id) => {
  // logFun && ku.logFunction('selectors.getNote');
  return state.notes.byId[id] || null;
};

export const getOpenNoteId = (state) => {
  // logFun && ku.logFunction('selectors.getOpenNoteId');
  return state.ui.openNoteId;
};

export const getToast = (state) => {
  // logFun && ku.logFunction('selectors.getToast');
  return state.ui.toast;
};

export const getRequest = (state, key) => {
  // logFun && ku.logFunction('selectors.getRequest');
  return state.requests[key] || {};
};

export const getRequests = (state) => {
  // logFun && ku.logFunction('selectors.getRequests');
  return state.requests;
};

export const areRequestsPending = (requests) => {
  // logFun && ku.logFunction('selectors.areRequestsPending');
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
