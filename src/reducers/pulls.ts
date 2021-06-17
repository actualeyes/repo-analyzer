import { PullRequest, GetPullRequestsAction } from '../actions/';
import { ActionTypes } from '../actions/types';

export const pullRequestsReducer = (
  state: PullRequest[] = [],
  action: GetPullRequestsAction
) => {
  switch (action.type) {
    case ActionTypes.getPullRequests:
      return action.payload;
    default:
      return state;
  }
};

