import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import styles from './styles/site';

export default class App extends Component {
    render() {
        return (
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <div className={styles.center}>
                        <span>Weels's blog</span>
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