import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/scss/bootstrap.scss'
import ListRepo from "./ListRepo";
import ListCommit from "./ListCommit";
import Spiner from "./Spiner";
import NotFound404 from "../components/NotFound404";


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Router basename='/'>
                <Switch>
                    <Route exact path='/' component={ListRepo}/>
                    <Route path='/commits/:owner/:repo' component={ListCommit}/>
                    <Route component={NotFound404}/>
                </Switch>
            </Router>
            <Spiner/>
        </div>
    }

}

export default (App);