import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from 'reducers';
import api from './api';

const middlewares = [ thunk.withExtraArgument(api) ];

// a dummy mock store for when the presence of a reducer is of no importance
const mockStore = configureMockStore(middlewares);

// a full store for when we need a proper store (ie. snapshot testing)
const createFakeStore = (initialState = {}) => createStore(rootReducer, initialState, applyMiddleware(middlewares[0]));

export { createFakeStore as createStore, mockStore };