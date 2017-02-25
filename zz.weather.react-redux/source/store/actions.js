import api from '../utils/api';
import { startAction, successAction, failureAction, asyncAction } from './actionUtils';
import * as keu from '../utils/ke-utils';
import * as c from '../utils/constants';

keu.log('const', c.FETCH_WEATHER);
const fetchWeatherType = c.FETCH_WEATHER;
export const fetchWeatherStart = startAction(fetchWeatherType);
export const fetchWeatherSuccess = successAction(fetchWeatherType);
export const fetchWeatherFailure = failureAction(fetchWeatherType);
c.TRACE && keu.log('action', fetchWeatherType);
export const fetchWeather = asyncAction({
  func: () => api.weather.get(),
  start: fetchWeatherStart,
  success: fetchWeatherSuccess,
  failure: fetchWeatherFailure,
});
