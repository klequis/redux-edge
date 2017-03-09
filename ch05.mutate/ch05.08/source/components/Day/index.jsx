import React from 'react';
import { PropTypes } from 'react';
import * as style from './style';

const Day = (props) => {
  const metric = true;
  const high = metric
    ? `${props.day.high.celsius}`
    : `${props.day.high.fahrenheit}`;
  const low = metric
    ? `${props.day.low.celsius}`
    : `${props.day.low.fahrenheit}`;
  const wind = metric
    ? `${props.day.avewind.kph} kph`
    : `${props.day.avewind.mph} mph`;


  return (
    <div>
      <p>{props.day.date.monthname_short} {props.day.date.day}</p>
      <p><img src={props.day.icon_url}></img></p>
      <p>{props.day.conditions}</p>
      <p>High: {high}</p>
      <p>Low: {low}</p>
      <p>Humidity: {props.day.avehumidity}</p>
      <p>Wind: {wind}</p>
    </div>
  );
};

export default Day;
