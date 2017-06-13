import {ADD_MSG, UPDATE_MSG} from 'constants/action_types';

export function add(text, time = new Date()) {
  return {
    type: ADD_MSG,
    text: text,
    time: time
  };
}

export function update(messages) {
  return {
    type: UPDATE_MSG,
    messages: messages
  };
}
