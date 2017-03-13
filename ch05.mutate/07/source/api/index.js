import 'isomorphic-fetch';
import { normalize, schema, arrayOf } from 'normalizr';
import * as ku from '../../lib/ke-utils';
const logFun = false;
const logLog = false;
import data from './localData';

const weatherURL = 'http://api.wunderground.com/api/8e038883d8fbbe15/forecast/geolookup/conditions/q/CA/';
// San_Francisco.json';

const hardURL = 'http://api.wunderground.com/api/8e038883d8fbbe15/forecast/geolookup/conditions/q/CA/San_Francisco.json';

export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (
  fetch(url)
  .then(rejectErrors)
  .then((res) => res.json())
);

export default {
  days: {
    readList() {
      logFun && ku.logFunction('readList');
      return new Promise(
        function(resolve, reject) {
          if (data) {
            resolve(data);
          } else {
            let err = new Error('could not get data');
            reject(err);
          }
        }
      )
    },
  },
};

/*
export default {
  days: {
    readList() {
      logFun && ku.logFunction('readList');
      // logLog && ku.log('location', location, 'red');
      // const url = `${weatherURL}${location}.json`;
      // logLog && ku.log('url', url, 'red');
      return fetchJson(hardURL)
        .then((data) => {
          const o = {
            branding: data.current_observation.image,
            current_observation: {
              station_id: data.current_observation.station_id,
              observation_time: data.current_observation.observation_time,
              weather: data.current_observation.weather,
              temp_f: data.current_observation.temp_f,
              temp_c: data.current_observation.temp_c,
              relative_humidity: data.current_observation.relative_humidity,
              wind_dir: data.current_observation.wind_dir,
              wind_mph: data.current_observation.wind_mph,
              wind_gust_mph: data.current_observation.wind_gust_mph,
              wind_kph: data.current_observation.wind_kph,
              wind_gust_kpy: data.current_observation.wind_gust_kph,
              pressure_mp: data.current_observation.pressure_mb,
              pressure_in: data.current_observation.pressure_in,
              pressure_trend: data.current_observation.pressure_trend,
              dewpoint_f: data.current_observation.dewpoint_f,
              dewpoint_c: data.current_observation.dewpoint_c,
              heat_index_f: data.current_observation.heat_index_f,
              heat_index_c: data.current_observation.heat_index_c,
              windchill_f: data.current_observation.windchill_f,
              windchill_c: data.current_observation.windchill_c,
              feelslike_f: data.current_observation.feelslike_f,
              feelslike_c: data.current_observation.feelslike_c,
              uv: data.current_observation.UV,
              icon: data.current_observation.icon,
              icon_url: data.current_observation.icon_url,
            },
            location: data.current_observation.display_location,
            days: data.forecast.simpleforecast.forecastday,
          };
          logLog && ku.log('readList.returned-data', o, 'red');
          return o;
        });
    },
  },
};

*/
