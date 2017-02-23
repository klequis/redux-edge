import { combineReducers } from 'redux';
import * as constants from './constants';
import { prepend } from 'ramda';
import { without } from 'ramda';
import { merge } from 'ramda';

const initialFriends = {
    id01: {
      id: 'id01',
      name: 'Joe',
    },
    id02: {
      id: 'id02',
      name: 'Jing',
    },
    id03: {
      id: 'id03',
      name: 'Janice',
    },
};

const initialIds = [
    'id01',
    'id02',
    'id03',
];

const initialActiveFriend = {
  activeFriend: 'id02',
};

export const friends = (state = initialFriends, { type, payload }) => {
  switch (type) {
    case constants.ADD_FRIEND:
      return merge(state, { [payload.id]: payload })
    default:
      return state;
  }
};

export const ids = (state = initialIds, { type, payload }) => {
  switch (type) {
    case constants.ADD_FRIEND:
      return prepend(payload.id, state);
    case constants.DELETE_FRIEND:
      return without(payload.id, state);
    default:
      return state;
  }
};

export default combineReducers({
  friends,
  ids,
});
