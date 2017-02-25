import Weather from './weather';
import * as keu from './ke-utils';
import * as c from './constants';
import 'isomorphic-fetch';

/*
const mockWeather = { "coord":{"lon":-79.4,"lat":36.59},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":5.78,"pressure":1020,"humidity":27,"temp_min":5,"temp_max":7},"visibility":16093,"wind":{"speed":2.6},"clouds":{"all":1},"dt":1486991700,"sys":{"type":1,"id":2843,"message":0.0075,"country":"US","sunrise":1486987615,"sunset":1487026626},"id":4755280,"name":"Danville","cod":200
};
*/

function flattenWeather(json) {
  // do stuff
  return {
    latitude: json.coord.lat,
    longitude: json.coord.lon,
    conditions: json.weather[0].description,
    conditionsIcon: json.weather[0].icon,
    date: json.dt,
    humidity: json.main.humidity,
    pressure: json.main.pressure,
    currentTemp: json.main.temp,
    city: json.name,
    windSpeed: json.wind.speed,
  };
}

function flattenForecast(json) {
  const daysList = json.list;
  const days = daysList.map((day) => {
    let o = {
      date: day.dt,
      temp: day.main.temp,
      temp_min: day.main.temp_min,
      conditions: day.weather[0].main,
      conditions_icon: day.weather[0].icon,
      wind_speed: day.wind.speed,
    };
    return o;
  });
  return days;
}


export default {
  weather: {
    get() {
      c.TRACE && keu.log('api.weather.get');
      return Weather('danville');
    },
  },
};
