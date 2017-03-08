// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Location = ({ location }) => {
  return (
    <div>
      <h2>Location</h2>
      <p>{location.full}, {location.country}</p>
      <p>elevation: {location.elevation}</p>
      <p>latitude: {location.latitude}</p>
      <p>longitude: {location.longitude}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: selectors.getLocation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Location);
