import { combineReducers } from 'redux';

let messages = (state = [], action) => {
  return state;
};

const rootReducer = combineReducers({
  messages
});

export default rootReducer;
