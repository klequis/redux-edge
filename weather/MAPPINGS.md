# Convert Notes to Weather

## Mappings
Conversion of Notes app functions to Weather Functions

type         notes                             weather                   used                defined
---------    ----------------------------      -----------------------   -----------------   ---------------
action       requestUpdateNotes()              requestGetWeather()       App                 actions.js
selector     readNotesRequest                  getWeatherRequest         App                 App
action       updateNote                        updateWeather             actions.js          actions.js
api          notes.update                      notes.update              actions.js          api/index.js



## To Do
1. Things are a little messed-up because I used requestUpdateNotes as the template for requestGetWeather. Just get the id passing working and then worry about this next.


## Significant Changes
1. api/index.js: removed 'options' from fetchJson






## Lessons Learned
BIG NEWS!!
                                                  From App requestGetWeather is called with a city name.
                                                  requestGetWeather is a const that = another function called createRequestThunk
                                                  When you cal requestGetWeather with parameters, you are populating the 
                                                  parameters of createRequestThunk - ok, got that finally.
                                                  
                                                  ?
                                                  Still it is confusing that it appears requestGetWeather takes no parameters. 
                                                  But really, since requestGetWeather is just createRequestThunk, it does take
                                                  parameters, the same ones that createRequestThunk does.
