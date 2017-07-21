import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class User extends Component {
    componentDidMount() {
        let path = window.location.pathname;
        let userInfo = sessionStorage.getItem('userInfo');
        if (userInfo === null
            && !path.includes('login')) {
                browserHistory.push('/admin/login');
            }
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const mapUserInfoToProps = state => {
    return {
        userInfo: state.user.info
    };
}

export default connect(mapUserInfoToProps)(User);