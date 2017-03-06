import React from 'react';
import { PropTypes } from 'react';
import * as style from './style';

const Day = (props) => {
  return (
    <div>
      Conditions: {props.conditions}<br></br>
      high: {props.highFahrenheit}<br></br>
      low: {props.lowFahrengeit}
      icon: {props.iconUrl}<b></b>
    </div>
  );
};

export default Day;
