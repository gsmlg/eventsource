import {PING} from 'constants/action_types';

const ping = (state = {} , action) => {
  switch(action.type) {
      case PING:
        let {host} = action.ping;
        return Object.assign({}, state, {[host]: action.ping});
  }
  return state;
};

export default ping;
