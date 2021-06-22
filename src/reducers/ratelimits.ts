import { Ratelimit, UpdateRatelimitDataAction } from '../actions/';
import { ActionTypes } from '../actions/types';

export const ratelimitsReducer = (
  state: Ratelimit = {},
  action: UpdateRatelimitDataAction
) => {
  switch (action.type) {
    case ActionTypes.updateRatelimitData:
      return action.payload;
    default:
      return state;
  }
};

