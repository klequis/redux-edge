// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';
import Day from '../Day';

const CurrentConditions = ({ currentObservation }) => {
  return (
    <div>
    <h1>Current Conditions</h1>
      <p>city: {location.city}</p>
      <p>temp_c: {currentObservation.temp_c}</p>
      <p>temp_f: {currentObservation.temp_f}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentObservation: selectors.getCurrentObservation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(CurrentConditions);
