import { combineReducers } from 'redux';
import { PullRequest, Ratelimit } from '../actions';
import { pullRequestsReducer } from './pulls';
import { ratelimitsReducer } from './ratelimits';

export interface StoreState {
  pullRequests: PullRequest[];
  ratelimits: Ratelimit;
}

export const reducers = combineReducers<StoreState>({
  pullRequests: pullRequestsReducer,
  ratelimits: ratelimitsReducer
});

