import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

var parse = require('parse-link-header');


export interface User {
  login: string;
}

export interface PullRequest {
  id: number;
  title: string;
  url: string;
  user: User;
}

export interface Ratelimit {
  limit?: number,
  remaining?: number,
  used?: number;
}

export interface GetPullRequestsAction {
  type: ActionTypes.getPullRequests;
  payload: PullRequest[];
}

export interface UpdateRatelimitDataAction {
  type: ActionTypes.updateRatelimitData;
  payload: Ratelimit;
}
const pullRequestsUrl = 'https://api.github.com/repos/ramda/ramda/pulls';

export const getPullRequests = () => {
  return (dispatch: Dispatch<GetPullRequestsAction | UpdateRatelimitDataAction>) => {
    const fetchData = (url: string, data: PullRequest[]) => {
      axios.get<PullRequest[]>(url)
        .then((res) => {
          console.log(res.headers["x-ratelimit-used"]);
          Array.prototype.push.apply(data, res.data);
          const linkHeader = parse(res.headers.link);
          if (linkHeader.next !== undefined) {
            fetchData(linkHeader.next.url, data);
          } else {
            dispatch({
              type: ActionTypes.getPullRequests,
              payload: data
            });
            dispatch({
              type: ActionTypes.updateRatelimitData,
              payload: {
                limit: res.headers["x-ratelimit-limit"],
                remaining: res.headers["x-ratelimit-remaining"],
                used: res.headers["x-ratelimit-used"]
              }
            });
          }
        }).catch((err) => console.log(err));
    };
    fetchData(pullRequestsUrl, []);
  };
}
