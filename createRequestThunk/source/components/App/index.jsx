import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actionCreators from '../../store/actions';
import * as style from './style';

class App extends Component {
  componentWillMount() {
    this.props.requestReadNotes();
  }

  render() {
    const { readNotesRequest } = this.props;

    switch (readNotesRequest.status) {
      case 'success':
        return (
          <div style={style.wrapper}>
            <div style={style.row}>
              <p>Number of notes: {this.props.notes.length}</p>
            </div>
            <div style={style.row}>
              <button
                onClick={() => this.props.requestUpdateNote(this.props.notes[0].id, this.props.notes[0].content)}
                >
                Save
              </button>
            </div>
          </div>
        );
      case 'failure':
        return (
          <div style={style.notice}>
            {(readNotesRequest.error.message === 'Failed to fetch')
              ? 'No connection, try again later!'
              : 'Hmm... Something didn\'t go as planned.'
            }
          </div>
        );
      default:
        return (
          <div style={style.notice}>
            Loading...
          </div>
        );
    }
  }
}

App.propTypes = {
  requestReadNotes: PropTypes.func.isRequired,
  readNotesRequest: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  const openNoteId = selectors.getOpenNoteId(state);
  return {
    readNotesRequest: selectors.getRequest(state, 'readNotes'),
    notes: selectors.getNotes(state),
    updateNoteRequest: selectors.getRequest(state, `updateNote/${openNoteId}`),
  };
};
export default connect(mapStateToProps, actionCreators)(App);
