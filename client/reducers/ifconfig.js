import {UPDATE_IFCFG} from 'constants/action_types';

const ifconfig = (state = '' , action) => {
  switch(action.type) {
      case UPDATE_IFCFG:
        return action.ifconfig;
        break;
  }
  return state;
};

export default ifconfig;
