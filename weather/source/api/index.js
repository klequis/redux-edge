import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as ku from '../lib/ke-utils';
const notes = new Schema('notes');
const APP_ID = 'cd605b9a7b8b517b82492ee7bf47a295';
const units = 'metric';
const weatherURLRoot = 'http://api.openweathermap.org/data/2.5/weather?';
const forecastURLRoot = 'http://api.openweathermap.org/data/2.5/forecast?';


export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url) => (
  fetch(url)
  .then(rejectErrors)
  .then((res) => res.json())
);

export default {
  notes: {

    readList() {
      return fetchJson('/api/notes')
        .then((data) => {
          const normalized = normalize(data, arrayOf(notes));
          return {
            notes: normalized.entities.notes || {},
            ids: normalized.result,
          };
        });
    },

    create() {
      return fetchJson(
        '/api/notes',
        {
          method: 'POST',
        }
      );
    },

// `/api/notes/${id}`,
    getWeather(id) {
      ku.log('id', id);
      const url = `${weatherURLRoot}q=${id},us&units=${units}&APPID=${APP_ID}`;
      return fetchJson(url)
      .then((data) => {
        ku.log('data', data);
      });
    },

    delete(id) {
      return fetchJson(
        `/api/notes/${id}`,
        {
          method: 'DELETE',
        }
      );
    },
  },
};
