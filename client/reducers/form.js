import {INPUT_TEXT, POST, POST_DONE, POST_ERROR} from 'constants/action_types';

const form = (state = {text: '', sending: false}, action) => {
  let assign = Object.assign;
  switch(action.type) {
    case INPUT_TEXT:
      return assign({}, state, {text: action.text});
    case POST:
      return assign({}, state, {sending: true});
    case POST_DONE:
      return assign({}, state, {sending: false, text: ''});
    case POST_ERROR:
      return assign({}, state, {sending: false});
  }
  return state;
};


export default form;
