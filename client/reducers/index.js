import {combineReducers} from "redux";
import messages from './messages';
import form from './form';

export default combineReducers({
  form,
  messages
});
