import {
  STATUS_ONLINE,
  STATUS_OFFLINE,
  networkOnline,
  networkOffline,
} from 'actions/connection';

import { mockStore } from '../mocks/store';

describe('connection action creators', () => {

  it('dispatches the appropriate action when we set to be online', () => {
    let store = mockStore({});
    store.dispatch(networkOnline());
    return expect(store.getActions()).toEqual([ { type: STATUS_ONLINE } ]);
  });

  it('dispatches the appropriate action when we set to be offline', () => {
    let store = mockStore({});
    store.dispatch(networkOffline());
    return expect(store.getActions()).toEqual([ { type: STATUS_OFFLINE } ]);
  });
});