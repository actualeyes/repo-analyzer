import React from 'react';
import { connect } from 'react-redux';
import { PullRequest, getPullRequests } from '../actions'
import { StoreState } from '../reducers';

interface AppProps {
  pullRequests: PullRequest[]
  getPullRequests(): any;
}

export class _App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.getPullRequests();
  }

  render() {



    const tableRows = this.props.pullRequests.map((pr) => {
      return (
        <tr>
          <td>{pr.user.login}</td><td>{pr.title}</td>
        </tr>
      )
    })


    return (tableRows.length > 0)
      ? (
        <div>
          <table style={{ "borderWidth": "5px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
            {tableRows}
          </table>
        </div >
      )
      : (<div>No Data, You've probably been rate limited</div>);


  }
}

const mapStateToProps = ({ pullRequests }: StoreState): { pullRequests: PullRequest[] } => {
  return { pullRequests };
}

export const App = connect(
  mapStateToProps,
  { getPullRequests }
)(_App)
