import api from '../api';
import { v4 } from 'uuid';
import * as ku from '../lib/ke-utils';
const logFun = true;
const logLog = true;

export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
});

export const closeNote = () => ({
  type: 'app/closeNote',
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
  // start
  let len = start.length;
  logLog && ku.log('start.length', start.length);
  len > 0 ? ku.log('start[0]', start[0]) : '';
  len > 1 ? ku.log('start[1]', start[1]) : '';
  len > 2 ? ku.log('start[2]', start[2]) : '';
  len > 3 ? ku.log('start[3]', start[3]) : '';
  // Success
  len = success.length;
  logLog && ku.log('success.length', success.length);
  len > 0 ? ku.log('success[0]', success[0]) : '';
  len > 1 ? ku.log('success[1]', success[1]) : '';
  len > 2 ? ku.log('success[2]', success[2]) : '';
  len > 3 ? ku.log('success[3]', success[3]) : '';
  // failure
  len = failure.length;
  logLog && ku.log('failure.length', failure.length);
  len > 0 ? logLog && ku.log('failure[0]', failure[0]) : '';
  len > 1 ? logLog && ku.log('failure[1]', failure[1]) : '';
  len > 2 ? logLog && ku.log('failure[2]', failure[2]) : '';
  len > 3 ? logLog && ku.log('failure[3]', failure[3]) : '';

  const tmp = (...args) => (dispatch) => {
    logFun && ku.logFunction('tmp');
    const o = {
      args,
      dispatch,
    };
    logLog && ku.log('tmp.args', o);
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    logLog && ku.log('tmp.requestKey', requestKey);
    start.forEach((actionCreator) => {
      logLog && ku.log('tmp.actionCreator', actionCreator);
      dispatch(actionCreator());
    });
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        logLog && ku.log('tmp.request.success');
        logLog && ku.log('tmp.request.success.args', args);
        success.forEach((actionCreator) => {
          logLog && ku.log('tmp.request.success.actionCreator', actionCreator);
          dispatch(actionCreator(data));
        });
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        logLog && ku.log('tmp.request.failure');
        logLog && ku.log('tmp.request.failure.args', args);
        failure.forEach((actionCreator) => {
          logLog && ku.log('tmp.request.failure.actionCreator', actionCreator);
          dispatch(actionCreator(reason));
        });
        dispatch(markRequestFailed(reason, requestKey));
      });
  };  // end returns
  logLog && ku.log('createRequestThunk.return', tmp);
  return tmp;
};

/* requestupdateNote, updateNote*/
export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
});
export const requestUpdateNote = createRequestThunk({
  request: api.notes.update,
  key: (id) => `updateNote/${id}`,
  success: [ updateNote, () => setToast('Note saved') ],
  failure: [ () => setToast('Couldn\'t save note', 'warn') ],
});

/* requestDeleteNote, removeNote */
export const removeNote = (id) => ({
  type: 'app/removeNote',
  payload: { id },
});
export const requestDeleteNote = createRequestThunk({
  request: api.notes.delete,
  key: (id) => `deleteNote/${id}`,
  success: [ (note) => removeNote(note.id), () => setToast('Note deleted') ],
  failure: [ () => setToast('Couldn\'t remove note', 'warn') ],
});

/* ************************ */
/* openNote: used by requestReadNotes & requestCreateNote */
export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
});

/* requestReadNotes, replaceNotes */
export const replaceNotes = (notes) => ({
  type: 'app/replaceNotes',
  payload: notes,
});
export const requestReadNotes = createRequestThunk({
  request: api.notes.readList,
  key: 'readNotes',
  success: [ replaceNotes, (notes) => (notes.ids.length > 0) ? openNote(notes.ids[0]) : noop('No note to open') ],
});

/* requestCreateNote, insertNote */
export const insertNote = (note) => ({
  type: 'app/insertNote',
  payload: note,
});
export const requestCreateNote = createRequestThunk({
  request: api.notes.create,
  key: 'createNote',
  success: [ insertNote, (note) => openNote(note.id), () => setToast('Note created') ],
  failure: [ () => setToast('Couldn\'t add note', 'warn') ],
});
/* ************************ */
