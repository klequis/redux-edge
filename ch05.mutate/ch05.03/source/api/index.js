import 'isomorphic-fetch';
import { normalize, schema, arrayOf } from 'normalizr';
import * as ku from '../../lib/ke-utils';
const weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?q=livermore,us&units=imperial&APPID=cd605b9a7b8b517b82492ee7bf47a295';


// const days = new Schema('days');
const daySchema = new schema.Entity('days', {}, { idAttribute: 'dt' });
const dayListSchema = new schema.Array(daySchema);

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
      ku.logFunction('readList');
      return fetchJson(weatherURL)
        .then((data) => {
          data = data.list;
          ku.log('data', data, 'red');
          // const normalized = normalize(data, arrayOf(days));
          const nd = normalize(data, dayListSchema);
          ku.log('normalized', nd, 'red');
          const o = {
            days: nd.entities.days || {},
            ids: nd.result,
          };
          ku.log('o', o, 'red');
          return o;
        });
    },
  },
};
