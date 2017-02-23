import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Forecast from '../Forecast';
import * as selectors from '../../store/selectors';
import * as actionCreators from '../../store/actions';
import * as style from './style';
import * as ku from '../../../lib/ke-utils';

class App extends Component {
  componentWillMount() {
    this.props.requestReadForecast();
  }

  render() {
    const { readForecastRequest } = this.props; // reports success or failure

    switch (readForecastRequest.status) {
      case 'success':
        return (
          <div style={style.wrapper}>
            <div style={style.row}>
              <Forecast />
            </div>
          </div>
        );
      case 'failure':
        return (
          <div style={style.notice}>
            {(readForecastRequest.error.message === 'Failed to fetch')
              ? 'No connection, try again later!'
              : 'Hmm... Something didn\'t go as planned.'
            }
          </div>
        );
      default:
        return (
          <div style={style.notice}>
            Loading...
          </div>
        );
    }
  }
}

App.propTypes = {
  requestReadForecast: PropTypes.func.isRequired,
  readForecastRequest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  readForecastRequest: selectors.getRequest(state, 'readForecast'),
});

export default connect(mapStateToProps, actionCreators)(App);
