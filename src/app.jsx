import React from 'react';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { applyWorker } from 'redux-worker'

import App from 'components/app/App';
import Api from 'lib/api';
import rootReducer from './reducers';

// Instantiate the worker
const HNWorker = require('worker-loader!./worker.jsx');
const worker = new HNWorker();
const api = new Api();

// Apply worker & api middleware
const middlewares = compose( applyMiddleware(thunkMiddleware.withExtraArgument(api)), applyWorker(worker) );
const store = createStore(rootReducer, {}, middlewares);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);