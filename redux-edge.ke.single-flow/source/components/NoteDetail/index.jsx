/*
 * This will be the only visible component
 */

 import React, { PropTypes } from 'react';
 import { connect } from 'react-redux';
 import * as actionCreators from '../../store/actions';
 import * as selectors from '../../store/selectors';

const Note = ({ notes, addNote }) => (
  <div>
    {console.log(addNote)}
    <button
      onClick={() => addNote()}
      >
      Add Note
    </button>
    <textarea
      autoFocus
      key={notes.id}
      />
  </div>
);

Note.PropTypes = {
  note: PropTypes.shape({
    id:  PropTypes.string.isRequired,
    content:  PropTypes.string.isRequired,
    timestamp:  PropTypes.number.isRequired,
  }),
};

const selector = (state) => ({
  notes: selectors.getNotes(state),
});

export default connect(selector, actionCreators)(Note);

// export default Note;
