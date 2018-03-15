import React, {Component} from 'react'

class ItemCommit extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const date = new Date(this.props.commit.commit.author.date);
        const avatar = this.props.commit.committer ? this.props.commit.committer.avatar_url : "";
        const style = isNaN(this.props.commit.sha.substr(-1)) ? {} : {backgroundColor: '#E6F1F6'};
        return <tr style={style}>
            <td>{this.props.commit.commit.author.name}</td>
            <td>{this.props.commit.commit.author.email}</td>
            <td><img src={avatar} style={{height: '30px'}}/></td>
            <td>{this.props.commit.commit.message}</td>
            <td>{date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}</td>
        </tr>
    }
}

export default ItemCommit;