import {SET_SYSTEM} from 'constants/action_types';

const system = (state = {}, action) => {
  switch(action.type) {
    case SET_SYSTEM:
      return action.system;
      break;
  }
  return state;
};

export default system;
