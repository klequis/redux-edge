import * as keu from './ke-utils';
import * as c from './constants';

"use-strict";
import 'isomorphic-fetch';

const APP_ID = 'cd605b9a7b8b517b82492ee7bf47a295';
const units = 'metric';
const weatherURLRoot = 'http://api.openweathermap.org/data/2.5/weather?';
const forecastURLRoot = 'http://api.openweathermap.org/data/2.5/forecast?';

function getIpInfoCity() {
  return fetch('https://ipinfo.io/json').then((response) => {
    return response.json().then((json) => {
      return json.city;
    });
  });
}

function getWeather(city) {
  const weatherURL = `${weatherURLRoot}q=${city},us&units=${units}&APPID=${APP_ID}`;
  // keu.log('weatherURL', weatherURL);
  const forecastURL = `${forecastURLRoot}q=${city},us&units=${units}&APPID=${APP_ID}`;
  // keu.log('forecastURL', forecastURL);
  return Promise.all([
    fetch(`${weatherURLRoot}q=${city},us&units=${units}&APPID=${APP_ID}`),
    fetch(`${forecastURLRoot}q=${city},us&units=${units}&APPID=${APP_ID}`),

    // fetch('http://ipinfo.io/json'),
    // fetch('http://ipinfo.io/json')
  ])
  .then(([ fetch1, fetch2 ]) => {
    return [ fetch1.json(), fetch2.json() ];
  })
  .then((json1, json2) => {
    console.log(json1);
    console.log(json2);
    return ({
      weather: json1,
      forecast: json2,
    });
  })
  .then((ret) => {
    return ret;
  })
  .catch((reason) => {
    console.log('error', reason);
  });
}

export default (city) => {
  return ((city) => {
    if (!city) {
      return getIpInfoCity()
        .then((city) => {
          return getWeather(city);
        });
    } else {
      return getWeather(city);
    }
  })(city);
};
