import {combineReducers} from "redux";
import messages from './messages';
import form from './form';
import ifconfig from './ifconfig';

export default combineReducers({
  ifconfig,
  form,
  messages
});
