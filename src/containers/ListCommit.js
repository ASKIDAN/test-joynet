import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ItemCommit from "../components/ItemCommit";
import getCommits from "../actions/getCommits";
import '../resources/scss/index.scss'

class ListCommit extends Component {

    constructor(props) {
        super(props);
        this.props.getCommits(props.match.params.owner + '/' + props.match.params.repo);
    }

    render() {
        return <div className='container'>
            <table className='table commits-table'>
                <thead className='thead-inverse'>
                    <tr>
                        <th className='author'>Author</th>
                        <th className='email'>Email</th>
                        <th className='avatar'>Avatar</th>
                        <th className='message'>Commit message</th>
                        <th className='date'>Date per commit</th>
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