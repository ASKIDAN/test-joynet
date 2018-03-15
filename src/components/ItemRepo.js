import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ItemRepo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='repoLink col-auto alert alert-secondary' style={{margin: '2px'}}>
            <Link to={'commits/' + this.props.data.full_name}>{this.props.data.name}</Link>
        </div>
    }
}

export default ItemRepo;