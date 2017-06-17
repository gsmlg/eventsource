import {SET_STATUS} from 'constants/action_types';

const status = (state = {}, action) => {
  switch(action.type) {
    case SET_STATUS:
      return action.status;
      break;
  }
  return state;
};

export default status;
