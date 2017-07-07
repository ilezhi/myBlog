import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import styles from './styles/site';
import { fetchArticles } from './actions/article';
import { fetchTags } from './actions/tag';

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

        console.log('mounted app');
    }

    render() {
        return (
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <div className={styles.center}>
                        <span>weels's blog</span>
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
}

const mapStateToProps = state => {
    return {};
}

export default connect(mapStateToProps, {fetchArticles, fetchTags})(App);
