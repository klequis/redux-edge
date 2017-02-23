import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import Friend from '../Friend';
import * as style from './style';

let nameValue = '';

function updateNameValue(text) {
  nameValue = text;
  console.log(nameValue);
}


const FriendsList = ({ friends, addFriend, deleteFriend }) => (
  <div>
    <button
      style={style.addFriendButton}
      onClick={() => {
        addFriend(nameValue);
        updateNameValue('');
      }}
      >
      Add Friend
    </button>
    <textarea
      autoFocus
      onChange={(event) => updateNameValue(event.target.value)}
      style={style.textarea}
      placeholder="Enter new friend's name..."
      />

    {(friends.length ===0)
      ? <div>You have no friends :(</div>
      : friends.map((friend) => (
        <Friend
          key={friend.id}
          id={friend.id}
          name={friend.name}
          deleteFriend={deleteFriend}
          />
      ))
    }
  </div>
);

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  addFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
}

const selector = (state) => ({
  friends: selectors.getFriends(state),
});

export default connect(selector, actionCreators)(FriendsList)
