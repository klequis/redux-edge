import React from 'react';
import * as style from './style';
import * as ku from '../../../lib/ke-utils';

import Nav from '../Nav';
import CurrentConditionsContainer from '../CurrentConditionsContainer';
import ForecastContainer from '../ForecastContainer';

const App = () => {
  return (
    <div>
      <Nav />
      <CurrentConditionsContainer />
      <ForecastContainer />
    </div>
  );
};

export default App;
