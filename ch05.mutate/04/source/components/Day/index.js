import React from 'react';
import { PropTypes } from 'react';
import * as style from './style';

const Day = (props) => {
  return (
    <div style={style.wrapper}>
      {props.day.date.pretty}<br></br>
      {props.day.conditions}<br></br>
      {props.day.high.fahrenheight}<br></br>
      {props.day.low.fahrenheight}
    </div>
  )
}

export default Day;
