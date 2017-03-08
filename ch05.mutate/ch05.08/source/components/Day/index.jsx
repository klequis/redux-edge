import React from 'react';
import { PropTypes } from 'react';
import * as style from './style';

const Day = (props) => {
  const metric = true;
  return (
    <div>
      <p>{props.day.date.monthname_short} {props.day.date.day}</p>
      <img src={props.day.icon_url}></img><br></br>
      {props.day.conditions}<br></br>
    <p>High: {metric ? props.day.high.celsius : props.day.high.fahrenheit}  </p>
    <p>Low: {metric ? props.day.low.celsius : props.day.low.fahrenheit}</p>
    <p>Humidity: {props.day.avehumidity}</p>
    <p>Wind: {metric ? props.day.avewind.kph : props.day.avewind.mph} {metric ? "kph" : "mph"}</p>
    </div>
  );
};

export default Day;
