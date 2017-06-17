import {combineReducers} from "redux";
import system from './system';
import status from './status';

export default combineReducers({
  system,
  status
});
