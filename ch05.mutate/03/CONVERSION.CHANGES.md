Forecast
------------------------------------------------------------------------------------------------
requestReadNotes()        requestReadForecast()
readNotesRequest()        readForecastRequest()
'readNotes'               'readForecast'


actions.js
------------------------------------------------------------------------------------------------

export const requestReadNotes     requestReadForecast
-----------------------------     -------------------
request: api.notes.readList       api.days.readList
key: 'readNotes'                  'readForecast'
replaceNotes                      replaceDays             ( is part of success: )
(notes) =>                        (days) =>
notes.ids.length                  days.ids.length         ( P: do days have IDs? )
openNote                          openDays
notes.ids                         days.ids

export const openNote             openDay
---------------------             -------
type: 'app/openNote'              'app/openDay'


reducers.js
------------------------------------------------------------------------------------------------

export const byId
-----------------
case 'app/replaceNotes'           'app/replaceDays'
return payload.notes              payload.days

export default combineReducers
------------------------------
notes:                            days:
openNoteId                        DELETE


selectors.js
------------------------------------------------------------------------------------------------
export const getNotes         getDays
---------------------
state.notes.ids.map           state.days.ids.map
export const getNote          getDay


api/index.js
------------------------------------------------------------------------------------------------
const notes = new Schema('notes')      const days = new Schema('days')

export default
--------------
notes: {                               days: {
fetchJson('/api/notes')                fetchJson('weatherURL')
arrayOf(notes)                         arrayOf(days)
notes: normalized.entities.notes       days: normalized.days


fetchJson.fetch(url  ...
------------------------------------------------------------------------------------------------
fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })



URL
------------------------------------------------------------------------------------------------
http://api.openweathermap.org/data/2.5/forecast?q=livermore,us&units=imperial&APPID=cd605b9a7b8b517b82492ee7bf47a295
