import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Weather from '../Weather';
import * as selectors from '../../store/selectors';
import * as actionCreators from '../../store/actions';
import * as style from './style';
import * as ku from '../../../lib/ke-utils';

class App extends Component {
  componentWillMount() {
    this.props.requestReadWeather('livermore'); // this is an action that calls api
  }

  render() {
    const { readWeatherRequest } = this.props; // reports success or failure
         // readWeatherRequest is a prop based on a selctor
    ku.log('status', readWeatherRequest.status, 'red');
    switch (readWeatherRequest.status) {
      case 'success':
        return (
          <div style={style.wrapper}>
            <h1>Success</h1>
            <div style={style.row}>
              <Weather />
            </div>
          </div>
        );
      case 'failure':
        return (
          <div style={style.notice}>
            <h1>Failure</h1>
            {(readWeatherRequest.error.message === 'Failed to fetch')
              ? 'No connection, try again later!'
              : 'Hmm... Something didn\'t go as planned.'
            }
          </div>
        );
      default:
        return (
          <div style={style.notice}>
            <h1>default</h1>
            Loading...
          </div>
        );
    }
  }
}

App.propTypes = {
  requestReadWeather: PropTypes.func.isRequired,
  readWeatherRequest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  readWeatherRequest: selectors.getRequest(state, 'readWeather'),
});

export default connect(mapStateToProps, actionCreators)(App);
