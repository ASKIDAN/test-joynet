import React, {Component} from 'react'
import moment from 'moment'

class ItemCommit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td>{this.props.commit.commit.author.name}</td>
            <td>{this.props.commit.commit.author.email}</td>
            <td><img src={this.props.commit.committer.avatar_url} style={{height: '30px'}}/></td>
            <td>{this.props.commit.commit.message}</td>
            <td>{moment(this.props.commit.commit.author.date).local()}</td>
        </tr>
    }
}

export default ItemCommit;