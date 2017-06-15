import $ from 'jquery';
import {PING} from 'constants/action_types';

export function ping(ping) {
  return {
    type: PING,
    ping: ping
  };
}
