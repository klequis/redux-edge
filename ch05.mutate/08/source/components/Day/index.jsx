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
    <div style={style.day}>
      <p><strong>{props.day.date.monthname_short} {props.day.date.day}</strong></p>
      <p><img src={props.day.icon_url}></img></p>
        <p>{high} / {low}</p>
      <p style={style.dataPoint}>{props.day.conditions}</p>
      <p style={style.dataPoint}>Humidity: {props.day.avehumidity}</p>
      <p style={style.dataPoint}>Wind: {wind}</p>
    </div>
  );
};

export default Day;
