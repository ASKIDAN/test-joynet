import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/scss/bootstrap.scss'

import ListRepo from "./ListRepo";
import ListCommit from "./ListCommit";


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={ListRepo}/>
                    <Route path='/:owner/:repo' component={ListCommit}/>
                </Switch>
            </Router>
        </div>
    }

}

function stateToProps(state) {
    return {}
}

function dispathToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(stateToProps, dispathToProps)(App);