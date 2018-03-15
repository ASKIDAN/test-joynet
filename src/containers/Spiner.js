import React, { Component } from 'react'
import {connect} from 'react-redux'
import spinner from '../resources/img/facebook-spinner.gif'
import {STATUS_LOADNING} from "../constants/constants";

class Spiner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.status === STATUS_LOADNING) {
            return <div className='container'>
                <div className='spinner-center'>
                    <img src={spinner} alt='loadning'/>
                </div>
            </div>
        }
        return null;
    }

}

function stateToProps(state) {
    return {
        status: state.status,
    }
}

export default connect(stateToProps)(Spiner);