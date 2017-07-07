import React, { Component } from 'react';


class User extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}


export default User;