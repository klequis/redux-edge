import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import Day from '../Day';
import * as style from './style';

const Forecast = ({ days }) => (
  <div style={style.forecast}>
    {(days.length === 0)
      ? <div>No forecast available</div>
      : days.map((d) => (
        <Day
          key={d.date.epoch}
          day={d}
          />
      ))
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    days: selectors.getDays(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Forecast);
