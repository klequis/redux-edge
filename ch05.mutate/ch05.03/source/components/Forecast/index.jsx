import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Forecast = ({ days } ) => (
  <div style={style.wrapper}>
    <h1>Number of Days: {days.length}</h1>
    {(days.length === 0)
      ? <div style={style.blankslate}>No days</div>
      : days.map((day) => (
          <button
            key={day.id}
            style={style.note}
            >
            Clouds: {day.clouds.all}<br></br>
            dt: {day.dt_txt}<br></br>
            humidity: {day.main.humidity}<br></br>
            pressure: {day.main.pressure}<br></br>
            temp: {day.main.temp}<br></br>
            temp_max: {day.main.temp_max}<br></br>
            temp_min: {day.main.temp_min}<br></br>
            description: {day.weather[0].description}<br></br>
            icon: {day.weather[0].icon}<br></br>
            wind deg: {day.wind.deg}<br></br>
            wind speed: {day.wind.speed}<br></br>
          </button>
      ))
    }
  </div>
);

const mapStateToProps = (state) => ({
  days: selectors.getDays(state),
});

export default connect(mapStateToProps, actionCreators)(Forecast);
