import { combineReducers } from 'redux';
import stories from './stories';
import connection from './connection';

export default combineReducers({
  connection,
  stories,
});