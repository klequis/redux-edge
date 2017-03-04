#redux-edge.ch05.mutate

**api/index.js**
***
- weatherURL: change to weatherUnderground
- Normalizr: not needed?
    - const daySchema: delete
    - const dayListSchema: delete
- export default.dys.readList
    - const nd = normalize(): delete
    - const o = (create shape of state): delete
- App: No change
- Forecast
    - days.map: remove until data is flowing
- actions: stay the same?
- index: say the same
- reducers: WILL NEED TO CHANGE
- selectors: WILL NEED TO CHANGE


## Data
const weatherURL = 'http://api.wunderground.com/api/8e038883d8fbbe15/forecast/geolookup/conditions/q/CA/San_Francisco.json';



branding:           current_observation.image
location:           current_observation.display_location{}
observation_time:   current_observation.observation_time "
weather:            current_observation.weather ""
temp_f:             current_observation.temp_f num
temp_c:             current_observation.temp_c num
relative_humidity:  current_observation.relative_humidity ""
wind_dir:           current_observation.wind_dir ""
wind_mph:           current_observation.wind_mph num
wind_gust_mph:      current_observation.wind_gust_mph ""
wind_kph:           current_observation.wind_kph num
wind_gust_kpy:      current_observation.wind_gust_kph ""
pressure_mp:        current_observation.pressure_mb ""
pressure_in:        current_observation.pressure_in ""
pressure_trend:     current_observation.pressure_trend ""
dewpoint_f:         current_observation.dewpoint_f num
dewpoint_c:         current_observation.dewpoint_c num
heat_index_f:       current_observation.heat_index_f "
heat_index_c;       current_observation.heat_index_c ""
windchill_f:        current_observation.windchill_f ""
windchill_c:        current_observation.windchill_c ""
feelslike_f:        current_observation.feelslike_f "
feelslike_c:        current_observation.feelslike_c "
uv:                 current_observation.UV ""
icon:               current_observation.icon "
icon_url:           current_observation.icon_url "url" 
days:               forecast.simpleforecast.forecastday[{}]
