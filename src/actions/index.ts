import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

var parse = require('parse-link-header');


export interface User {
  login: string;
}

export interface PullRequest {
  title: string;
  url: string;
  user: User;
}

export interface GetPullRequestsAction {
  type: ActionTypes.getPullRequests;
  payload: PullRequest[];
}

const pullRequestsUrl = 'https://api.github.com/repos/ramda/ramda/pulls';

export const getPullRequests = () => {
  return (dispatch: Dispatch<GetPullRequestsAction>) => {
    const fetchData = (url: string, data: PullRequest[]) => {
      axios.get<PullRequest[]>(url)
        .then((res) => {
          Array.prototype.push.apply(data, res.data);
          const linkHeader = parse(res.headers.link);
          if (linkHeader.next !== undefined) {
            fetchData(linkHeader.next.url, data);
          } else {
            dispatch({
              type: ActionTypes.getPullRequests,
              payload: data
            })
          }
        }).catch((err) => console.log(err));
    };

    fetchData(pullRequestsUrl, []);
  };
}
