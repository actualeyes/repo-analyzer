import { combineReducers } from 'redux';
import { PullRequest } from '../actions';
import { pullRequestsReducer } from './pulls';

export interface StoreState {
  pullRequests: PullRequest[];
}

export const reducers = combineReducers<StoreState>({
  pullRequests: pullRequestsReducer
});

