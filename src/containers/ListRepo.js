import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ItemRepo from "../components/ItemRepo"
import getRepos from '../actions/getRepos'


class ListRepo extends Component {

    constructor(props) {
        super(props);
        this.props.getRepos();
    }

    render() {
        return <div className='container list-repos'>
            <div className='row'>
                {
                    this.props.repos.map(item => {
                        return (<ItemRepo data={item} key={item.id}/>);
                    })
                }
            </div>
        </div>
    }

}

function stateToProps(state) {
    return {
        repos: state.repos,
    }
}

function dispathToProps(dispatch) {
    return bindActionCreators({getRepos: getRepos}, dispatch);
}

export default connect(stateToProps, dispathToProps)(ListRepo);