import React, { Component } from 'react';


class Articles extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}


export default Articles;