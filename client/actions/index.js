import $ from 'jquery';
import {ADD_MSG, UPDATE_MSG, INPUT_TEXT, POST, POST_DONE, POST_ERROR} from 'constants/action_types';

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

export function input(text) {
  return {
    type: INPUT_TEXT,
    text: text
  };
}

export function post(text, done, fail) {
  $.post('/add-messages', {text: text}).then(done).catch(fail);
  return {
    type: POST
  };
}

export function postDone() {
  return {
    type: POST_DONE
  };
}

export function postFail() {
  return {
    type: POST_ERROR
  };
}
