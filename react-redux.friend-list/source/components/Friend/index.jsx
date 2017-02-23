import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Friend = (props) => (
  <div>
    <p>{props.id} : {props.name}
      <button
        style={style.deleteFriendButton}
        onClick={() => props.deleteFriend(props.id)}
        >
        Delete
      </button>
    </p>
  </div>
);

Friend.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteFriend: PropTypes.func.isRequired,
};

export default Friend;

/* can't figure it out
const Friend = (props, friend, deleteFriend) => (
  <div>
    <p>{friend.id} : {friend.name}
      <button
        style={style.deleteFriendButton}
        onClick={() => deleteFriend(friend.id)}
        >
        Delete
      </button>
    </p>
  </div>
);

const selector = (state) => ({
  friend: selectors.getFriend(state, friend.id)
});

export default connect(selector, actionCreators)(Friend);
*/
