import React from 'react';
import { connect } from 'react-redux';
import { PullRequest, getPullRequests, Ratelimit } from '../actions'
import { StoreState } from '../reducers';

interface AppProps {
  pullRequests: PullRequest[]
  ratelimits: Ratelimit;
  getPullRequests(): any;
}

export class _App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.getPullRequests();
  }

  render() {



    const tableRows = this.props.pullRequests.map((pr) => {
      return (
        <tr key={pr.id}>
          <td data-label="Login">{pr.user.login}</td><td data-label="Title">{pr.title}</td>
        </tr >
      )
    })
    console.log(this.props.ratelimits)

    return (tableRows.length > 0)
      ? (
        <div>
          <h4>RateLimits</h4>
          <p>Limit: {this.props.ratelimits.limit}</p>
          <p>Remaining: {this.props.ratelimits.remaining}</p>
          <p>Used: {this.props.ratelimits.used}</p>
          <table className="ui celled table">
            <thead>
              <tr><th>Login</th><th>Title</th></tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div >
      )
      : (<div>No Data, You've probably been rate limited</div>);


  }
}


const mapStateToProps = ({ pullRequests, ratelimits }: StoreState): { pullRequests: PullRequest[], ratelimits: Ratelimit } => {
  return { pullRequests, ratelimits };
}

export const App = connect(
  mapStateToProps,
  { getPullRequests }
)(_App)
