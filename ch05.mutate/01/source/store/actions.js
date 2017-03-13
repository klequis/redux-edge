import api from '../api';
import { v4 } from 'uuid';

import * as ku from '../../lib/ke-utils';
// /home/klequis/wk/redux/ch05.mutate/lib/ke-utils.js
// /home/klequis/wk/redux/ch05.mutate/source/store/actions.js

export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
});

export const insertNote = (note) => ({
  type: 'app/insertNote',
  payload: note,
});

export const replaceNotes = (notes) => ({
  type: 'app/replaceNotes',
  payload: notes,
});

export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
});

export const removeNote = (id) => ({
  type: 'app/removeNote',
  payload: { id },
});

export const closeNote = () => ({
  type: 'app/closeNote',
});

export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
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
  const o = {
    request: request,
    key: key,
    start: start,
    success: success,
    failure: failure,
  }
  ku.log('createRequestThunk', o, 'red');

  return (...args) => (dispatch) => {
    ku.log('...args', args, 'red');

    // if key is a function pass it args else key
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    ku.log('requestKey', requestKey, 'red');

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args) // request is function like api.notes.readList()
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

export const requestReadNotes = createRequestThunk({
  request: api.notes.readList,
  key: 'readNotes',
  success: [
    replaceNotes,
    (notes) => (notes.ids.length > 0) ? openNote(notes.ids[0]) : noop('No note to open'),
  ],
});

export const requestCreateNote = createRequestThunk({
  request: api.notes.create,
  key: 'createNote',
  success: [ insertNote, (note) => openNote(note.id), () => setToast('Note created') ],
  failure: [ () => setToast('Couldn\'t add note', 'warn') ],
});

export const requestUpdateNote = createRequestThunk({
  request: api.notes.update,
  key: (id) => `updateNote/${id}`,
  success: [ updateNote, () => setToast('Note saved') ],
  failure: [ () => setToast('Couldn\'t save note', 'warn') ],
});

export const requestDeleteNote = createRequestThunk({
  request: api.notes.delete,
  key: (id) => `deleteNote/${id}`,
  success: [ (note) => removeNote(note.id), () => setToast('Note deleted') ],
  failure: [ () => setToast('Couldn\'t remove note', 'warn') ],
});
