// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const CurrentConditions = ({ currentObservation, location }) => {
  const metric = true;
  const temp = metric
    ? `${currentObservation.temp_c} C`
    : `${currentObservation.temp_f} F`;
  const dewpoint = metric
    ? `${currentObservation.dewpoint_c} C`
    : `${currentObservation.dewpoint_f} F`;
  const feelslike = metric
    ? `${currentObservation.feelslike_c} C`
    : `${currentObservation.feelslike_f} F`;
  const pressure = metric
    ? `${currentObservation.pressure_mp} mp`
    : `${currentObservation.feelslike_in} in`;
  const windspeed = metric
    ? `${currentObservation.wind_kph} kph`
    : `${currentObservation.wind_mph} mph`;
  const windgust = metric
    ? `${currentObservation.wind_gust_kpy} kph`
    : `${currentObservation.wind_gust_mph}  mph`;
  const windchill = metric
    ? `${currentObservation.windchill_c} C`
    : `${currentObservation.windchill_f} F`;
  return (
    <div id="current-conditions" style={style.container}>
      <div style={style.item}>
        <img src={currentObservation.icon_url} />
        <p>{currentObservation.weather}</p>
        <p>{temp}</p>
      </div>
      <div style={style.item}>
        <p>Dewpoint {dewpoint}</p>
        <p>Feels like {feelslike}</p>
        <p>Pressure {pressure} {currentObservation.pressure_trend}</p>
        <p>Relative humidity: {currentObservation.relative_humidity}</p>
      </div>
      <div style={style.item}>
        <p>UV: {currentObservation.uv}</p>
        <p>Wind {currentObservation.wind_dir} at {windspeed}</p>
        <p>Gusts {windgust}</p>
        <p>Windchill {windchill}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentObservation: selectors.getCurrentObservation(state),
    location: selectors.getLocation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(CurrentConditions);
