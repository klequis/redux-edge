// npm modules
import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
// store
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
// components
import Nav from '../Nav';
import CurrentConditions from '../CurrentConditions';
import Forecast from '../Forecast';
// style
import * as style from './style';
// utils
import * as ku from '../../../lib/ke-utils';

class App extends Component {
  componentWillMount() {
    ku.logFunction('componentWillMount');
    this.props.requestReadWeather(this.props.city); // this is an action that calls api
  }

  render() {
    const { readWeatherRequest } = this.props; // reports success or failure
         // readWeatherRequest is a prop based on a selctor
    switch (readWeatherRequest.status) {
      case 'success':
        return (
          <div>
            <h1>Success</h1>
            <div>
              <Nav />
              <CurrentConditions />
              <Forecast />
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

/* works
const mapStateToProps = (state) => ({
  readWeatherRequest: selectors.getRequest(state, 'readWeather'),
});
*/

const mapStateToProps = (state) => {
  // const city = selectors.getCity(state);
  return {
    readWeatherRequest: selectors.getRequest(state, 'readWeather'),
    city: selectors.getCity(state),
    readCityRequest: selectors.getRequest(state, 'readCity'),
  };
};


export default connect(mapStateToProps, actionCreators)(App);
