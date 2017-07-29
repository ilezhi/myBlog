import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button } from 'react-toolbox/lib/button';
import styles from './styles/site';
import { fetchArticles } from './actions/article';
import { fetchTags } from './actions/tag';
import { addUserInfo, signout, resetPasswd } from './actions/user';
import FontIcon from 'react-toolbox/lib/font_icon';
import Tooltip from 'react-toolbox/lib/tooltip';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import { Snackbar } from 'react-toolbox/lib/snackbar';


const TooltipIcon = Tooltip(FontIcon);

/**
 * 所有组件的父组件
 * 在此请求文章，标签信息，作者信息
 * 
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            message: '',
            showPass: false,
            passwd: '',
            cPasswd: '',
        }
    }

    // 组件挂载时请求数据
    componentDidMount() {
        // 请求文章
        Promise.all([
            this.props.fetchArticles({
                pageSize: 20,
                pageNum: 1
            }),
            this.props.fetchTags()
        ]);

        try {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (userInfo) {
                this.props.addUserInfo(userInfo);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <div className={styles.center}>
                        <span>weels's blog</span>
                        {this.props.userInfo._id ? this.renderMenu() : false}
                    </div>
                </header>
                <div className={styles.main}>
                    <div className={styles.center}>
                        <ReactCSSTransitionGroup
                            transitionName='transitionWrapper'
                            component='div'
                            className={styles.transitionWrapper}
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}>
                            <div key={this.props.location.pathname} style={{width: '100%'}}>
                                {this.props.children}
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <footer className={styles.footer}>
                    <div className={styles.center}>
                        <p className={styles.copyright}>created by weels</p>
                    </div>
                </footer>
                <Dialog
                    active={this.state.showPass}
                    actions={this.passActions}
                    onOverlayClick={this.cancelPassDialog}
                    title='修改密码'>
                    <div><Input type='password' label='passwd' value={this.state.passwd} onChange={this.changePasswd} /></div>
                    <div><Input type='password' label='confirm passwd' value={this.state.cPasswd} onChange={this.changeCPasswd} /></div>
                </Dialog>
                <Snackbar action='Dismiss' label={this.state.message} active={this.state.active} timeout={3000} onTimeout={this.SnackbarTimeout} />
            </div>
        );
    }

    renderMenu = () => {
        return (
            <IconMenu className='pull-right' icon='more_vert' position='topRight' menuRipple>
                <MenuItem value='profile' icon='perm_identity' caption='个人信息' />
                <MenuItem value='passwd' icon='lock_outline' caption='修改密码' onClick={this.openPassDialog}/>
                <MenuDivider />
                <MenuItem value='signout' icon='power_settings_new' caption='登出' onClick={this.signout} />
            </IconMenu>
        )
    };

    signout = async() => {
        let res = await this.props.signout();
        if (res.type.includes('SUCCESS')) {
            sessionStorage.removeItem('userInfo');
            browserHistory.push('/admin/login');
        }
    };

    passActions = [
        { label: '取消', onClick: this.cancelPassDialog.bind(this) },
        { label: '确定', onClick: this.resetPasswd.bind(this) }
    ];

    changePasswd = passwd => {
        this.setState({
            ...this.state,
            passwd
        });
     };

     changeCPasswd = cPasswd => {
        this.setState({
            ...this.state,
            cPasswd
        });
     };

     /**
     * 打开修改密码框
     */
     openPassDialog = () => {
         this.setState({
             ...this.state,
             showPass: true
         });
     };

     /**
     * 关闭修改密码框
     */
    cancelPassDialog() {
        this.setState({
            ...this.state,
            showPass: false,
            passwd: '',
            cPasswd: ''
        });
    };

    /**
      * 确定修改密码
      */
    async resetPasswd() {
        //
        let { passwd, cPasswd } = this.state;
        if (passwd.trim() === '' || cPasswd.trim() === '') {
            alert('密码不能为空');
            return;
        }

        let res = await this.props.resetPasswd({passwd, cPasswd});

        if (res.type.includes('FAILURE')) {
            alert(res.message);
            return;
        }

        if (res.type.includes('SUCCESS')) {
            this.setState({
                ...this.state,
                active: true,
                message: res.data.msg
            });
        }

        this.cancelPassDialog();
     }

    SnackbarTimeout = () => {
        this.setState({
            ...this.state,
            active: false,
        });
    }


}

const mapStateToProps = state => {
    return {
        userInfo: state.user.info
    };
}

export default connect(mapStateToProps, {fetchArticles, fetchTags, addUserInfo, signout, resetPasswd})(App);
