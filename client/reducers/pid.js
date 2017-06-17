import {SHOW_PID} from 'constants/action_types';

const pid = (state = '', action) => {
  switch(action.type) {
    case SHOW_PID:
      return action.pid;
      break;
  }
  return state;
};

export default pid;
