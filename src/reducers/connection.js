import {
  STATUS_ONLINE,
  STATUS_OFFLINE,
} from 'actions/connection';

const connection = (state = {}, action) => {
  switch (action.type) {
    case STATUS_ONLINE:
      return Object.assign({}, state, {
        isOnline: true,
      });

    case STATUS_OFFLINE:
      return Object.assign({}, state, {
        isOnline: false,
      });
  }

  return state;
};

export default connection;
