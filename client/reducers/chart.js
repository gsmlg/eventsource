import {PING} from 'constants/action_types';

const ping = (state = {} , action) => {
  switch(action.type) {
      case PING:
        let {host, name, time, date} = action.ping;
        date = new Date(date);
        if (isNaN(parseInt(time))) {
          time = null;
        }
        let data = state[host] || {
          name: name,
          host: host,
          data: []
        };
        data.data.push([date, time]);
        return Object.assign({}, state, {[host]: data});
  }
  return state;
};

export default ping;
