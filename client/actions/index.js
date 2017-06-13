export const UPDATE_MSG = 'UP_MSG';

export function add(msg, time = new Date()) {
  return {
    type: ADD_MSG,
    message: msg,
    time: time
  };
}

export function upate(msgs) {
  return {
    type: UPDATE_MSG,
    messages: msgs
  };
}
