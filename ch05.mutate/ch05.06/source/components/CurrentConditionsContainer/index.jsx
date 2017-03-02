import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actionCreators from '../../store/actions';
import * as style from './style';
import CurrentConditions from '../CurrentConditions';
import * as ku from '../../../lib/ke-utils';

const CurrentConditionsContainer = () => {
  return (
    <div>
      <h1>Current Conditions Container</h1>
      <CurrentConditions />
    </div>
  );
};

export default CurrentConditionsContainer;
