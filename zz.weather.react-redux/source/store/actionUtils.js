import * as keu from '../utils/ke-utils';
import * as c from '../utils/constants';

export const asyncAction = ({ func, start, success, failure }) => (
  (...args) => (dispatch) => {
    const o = {
      func,
      start,
      success,
      failure,
    }
    c.TRACE && keu.log('asyncAction', o);
    dispatch(start());
    return func(...args)
      .then((data) => dispatch(success(data)))
      .catch((error) => dispatch(failure(error)));
  }
);

export const startAction = (type) => () => {
  c.TRACE && keu.log('startAction', type);
  return (
    {
      type,
      meta: {
        done: false,
      },
    }
  );
};

export const successAction = (type) => (payload) => {
  const o = {
    type,
    payload,
  }
  c.TRACE && keu.log('successAction', o);
  return (
    {
      type,
      payload,
      meta: {
        done: true,
      },
    }
  );
};

export const failureAction = (type) => (error) => {
  c.TRACE && keu.log('failureAction');
  return ({
    type,
    payload: error,
    error: true,
    meta: {
      done: true,
    },
  });
};
