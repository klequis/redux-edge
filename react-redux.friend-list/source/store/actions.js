const uid = () => Math.random().toString(34).slice(2);
import * as constants from './constants';

export const addFriend = (name) => {
  return {
    type: constants.ADD_FRIEND,
    payload: {
      id: uid(),
      name,
    },
  };
};

export const deleteFriend = (id) => {
  console.log(id);
  return {
    type: constants.DELETE_FRIEND,
    payload: {
      id,
    },
  };
};
