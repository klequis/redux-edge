import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';
import Day from '../Day';

const Weather = ({ branding, currentObservation, days, location } ) => (
  <div style={style.wrapper}>
    <h1>Location: {location.city}</h1>
    <h2>Number of Days: {days.length}</h2>
    {(days.length === 0)
      ? <div style={style.blankslate}>No days</div>
      : days.map((day) => (
        <Day
          key={day.date.epoch}
          day={day}
          />
      ))
    }
  </div>
);

const mapStateToProps = (state) => ({
  branding: selectors.getBranding(state),
  currentObservation: selectors.getCurrentObservation(state),
  days: selectors.getDays(state),
  location: selectors.getLocation(state),
});

export default connect(mapStateToProps, actionCreators)(Weather);
