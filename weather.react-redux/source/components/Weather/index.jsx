import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as keu from '../../utils/ke-utils';
import * as c from '../../utils/constants';

class Weather extends Component {
  componentWillMount() {
    // Should I use Promise.all() here to retrieve 2 results that
    // populate state?
    c.TRACE && keu.log('componentWillMount.Start');

    keu.log('before fetchWeather', '', 'red');
    this.props.fetchWeather()
    keu.log('after fetchWeather', '', 'red');

      /*
      .then((responses) => {
        responses[0].then((json) => {
          console.log('response01', json);
        });
        responses[1].then((json) => {
          console.log('response01', json.list);
        });
      });
      */
  }

  render() {
    c.TRACE && keu.log('Weather.render()');
    const { weather } = this.props;
    return (
      <div>
        <h1>Weather</h1>
        {(weather.length === 0)
          ? <div>No weather yet</div>
          : <div>
              <p>Conditions: {weather.conditions}</p>
              <p>conditionsIcon: {weather.conditionsIcon}</p>
              <p>City: {weather.city}</p>
              <p>Current Temperature: {weather.currentTemp}</p>
              <p>Date: {weather.date}</p>
              <p>Humidity: {weather.humidity}</p>
              <p>Latitude: {weather.latitude}</p>
              <p>Longitude: {weather.longitude}</p>
              <p>Pressure: {weather.pressure}</p>
              <p>Wind Speed: {weather.windSpeed}</p>
            </div>
        }
      </div>
    );
  }
}

const selector = (state) => ({
  weather: selectors.getWeather(state),
});

export default connect(selector, actionCreators)(Weather);
