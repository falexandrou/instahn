import {
  STATUS_ONLINE,
  STATUS_OFFLINE,
} from 'actions/connection';

import connectionReducer from 'reducers/connection';

describe('connections reducer', () => {

  it('should return the initial state', () => {
    expect(connectionReducer(undefined, {})).toEqual({});
  });

  it('should mark the user as online', () => {
    expect(connectionReducer({}, { type: STATUS_ONLINE })).toEqual({
      isOnline: true,
    });
  });

  it('should mark the user as offline', () => {
    expect(connectionReducer({}, { type: STATUS_OFFLINE })).toEqual({
      isOnline: false,
    });
  });
});
