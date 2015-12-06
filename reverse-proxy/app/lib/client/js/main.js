/* jshint esnext: true, node: true, browser: true */

'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import AppClient from './app-client';
import { Store } from './store';

let appContainer = document.getElementById('app');

ReactDOM.render(
  <Provider store={Store}>
    <AppClient />
  </Provider>,
  appContainer
);
