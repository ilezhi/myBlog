import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import styles from './styles/site';
import { fetchArticles } from './actions/article';
import { fetchTags } from './actions/tag';
import { addUserInfo } from './actions/user';

/**
 * 所有组件的父组件
 * 在此请求文章，标签信息，作者信息
 * 
 */
class App extends Component {
    constructor(props) {
        super(props);
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
                        {this.props.userInfo._id ? <a className='pull-right' onClick={this.signout} href="javascript:;">登出</a> : false}
                    </div>
                </header>
                <div className={styles.main}>
                    <div className={styles.center}>
                        {this.props.children}
                    </div>
                </div>
                <footer className={styles.footer}>
                    <div className={styles.center}>
                        <p className={styles.copyright}>created by weels</p>
                    </div>
                </footer>
            </div>
        );
    }

    signout = async() => {
        let res = await fetch('/api/signout', {
            method: 'POST',
            headers: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        let data = await res.json();
        console.log(data);
        sessionStorage.removeItem('userInfo');
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.info
    };
}

export default connect(mapStateToProps, {fetchArticles, fetchTags, addUserInfo})(App);
