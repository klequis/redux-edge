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
    if (this.props.city) {
      ku.log('I have a city');
    } else {
      ku.log('I do not have a city');
      this.props.requestReadWeather(); // this is an action that calls api
    }
  }

  render() {
    const { readWeatherRequest } = this.props; // reports success or failure
         // readWeatherRequest is a prop based on a selctor
    switch (readWeatherRequest.status) {
      case 'success':
        return (
          <div style={style.wrapper}>
            <h1>Success</h1>
            <div style={style.row}>
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
  };
};


export default connect(mapStateToProps, actionCreators)(App);
