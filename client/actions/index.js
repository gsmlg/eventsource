import {SET_SYSTEM, SET_STATUS} from 'constants/action_types';

export const setSystem = (system) => {
  return {
    type: SET_SYSTEM,
    system: system
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status: status
  };
};
