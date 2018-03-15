import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ItemCommit from "../components/ItemCommit";
import getCommits from "../actions/getCommits";

class ListCommit extends Component {

    constructor(props) {
        super(props);
        this.props.getCommits(props.match.params.owner + '/' + props.match.params.repo);
    }

    render() {
        return <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Commit message</th>
                        <th>Date per commit</th>
                    </tr>
                </thead>
                <tbody>

                {
                    this.props.commits.map((item) => {
                        return (<ItemCommit commit={item} key={item.sha}/>)
                    })
                }
                </tbody>
            </table>
        </div>
    }

}

function stateToProps(state) {
    return {
        commits: state.commits
    }
}

function dispathToProps(dispatch) {
    return bindActionCreators({getCommits: getCommits}, dispatch);
}

export default connect(stateToProps,dispathToProps)(ListCommit);