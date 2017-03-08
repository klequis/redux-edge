// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Title = ({ currentObservation, location }) => {
  return (
    <div>
      <p>city: {location.city}, {location.state} {location.zip}</p>
      <p>{currentObservation.observation_time}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentObservation: selectors.getCurrentObservation(state),
    location: selectors.getLocation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Title);
