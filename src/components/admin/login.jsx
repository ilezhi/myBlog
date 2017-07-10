import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';
import styles from '../../styles/site';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { Snackbar } from 'react-toolbox/lib/snackbar';

import {
    signin
} from '../../actions/user';

import {
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
} from '../../constants/userType';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginname: '',
            pass: '',
            message: '',
            active: false,
        };
    }

    render() {
        return (
            <div className={styles.loginWrap}>
                <form>
                    <div>
                        <Input type='text' label='user' value={this.state.loginname} onChange={this.changeUserName} />
                    </div>
                    <div>
                        <Input type='password' label='password' value={this.state.pass} onChange={this.changePwd} />
                    </div>
                    <div className={styles.loginBtn}>
                        { this.props.isFetching
                           ? <ProgressBar type='circular' mode='indeterminate' />
                           : <Button icon='fingerprint' floating onClick={this.signIn} />
                        }
                    </div>
                    <Snackbar action='Dismiss' label={this.state.message} active={this.state.active} timeout={3000} onTimeout={this.SnackbarTimeout} />
                </form>
            </div>
        );
    }

    changeUserName = (name) => {
        this.setState({
            ...this.state,
            loginname: name
        });
    }

    changePwd = (pass) => {
        this.setState({
            ...this.state,
            pass
        });
    }

    signIn = async () => {

        let { loginname, pass } = this.state;

        if (loginname === '' || pass === '') {
            alert('用户名或密码不能为空');
            return;
        }

        let res = await this.props.signin({loginname, pass});

        if (res.type === SIGNIN_SUCCESS) {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data));
            browserHistory.push('/admin/article');
            return;
        }

        if (res.type === SIGNIN_FAILURE) {
            this.setState({
                ...this.state,
                message: res.message,
                active: true
            });
        }
    }

    SnackbarTimeout = () => {
        this.setState({...this.state, active: false});
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.user.isFetching,
        message: state.user.message,
    };
}

export default connect(mapStateToProps, {signin})(Login);