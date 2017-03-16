import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Page from './components/Page';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Page />
  </Provider>,
  document.getElementById('app')
);
