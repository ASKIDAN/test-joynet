import React, {Component} from 'react'
import { Link } from 'react-router-dom'
class ItemRepo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='row'>
            <div className='repoLink col-5'>
                <Link to={this.props.data.full_name}>{this.props.data.name}</Link>
            </div>
        </div>
    }
}

export default ItemRepo;