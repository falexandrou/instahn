export const STATUS_ONLINE     = 'online';
export const STATUS_OFFLINE    = 'offline';

const networkStatus = (isOnline = true) => {
  return (dispatch, getState) => {  // eslint-disable-line no-unused-vars
    dispatch({ type: isOnline ? STATUS_ONLINE : STATUS_OFFLINE });
  };
};

export const networkOnline = () => networkStatus(true);
export const networkOffline = () => networkStatus(false);
