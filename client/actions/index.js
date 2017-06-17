import $ from 'jquery';
import {SHOW_PID} from 'constants/action_types';

export const showPIDs = (pid) => {
  return {
    type: SHOW_PID,
    pid: pid
  };
};
