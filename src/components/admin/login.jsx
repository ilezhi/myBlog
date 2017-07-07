import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';
import styles from '../../styles/site';
import ProgressBar from 'react-toolbox/lib/progress_bar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: '',
            
        };
    }

    render() {
        return (
            <div className={styles.loginWrap}>
                <form>
                    <Input type='password' label='password' onChange={changePwd} />
                    <div className={styles.loginBtn}>
                        <Button icon='fingerprint' floating onClick="signIn" />
                        <ProgressBar type='circular' mode='indeterminate' />
                    </div>
                </form>
            </div>
        );
    }

    changePwd = (pwd) => {
        this.setState({
            ...this.state,
            pwd
        });
    }

    signIn = () => {

    }
}

export default Login;