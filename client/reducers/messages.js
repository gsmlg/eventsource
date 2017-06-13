import {ADD_MSG, UPDATE_MSG} from 'constants/action_types';

const messages = (state = [], action) => {
  switch(action.type) {
      case ADD_MSG:
        return state.concat([
          {text: action.text, time: action.time}
        ]);
      case UPDATE_MSG:
        return action.messages;
        break;
  }
  return state;
};


export default messages;
