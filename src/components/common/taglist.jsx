import React, { Component } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import styles from '../../styles/site';

const { tagswrap } = styles;

export default class TagList extends Component {
    render() {
        return (
            <aside className={tagswrap}>
                <List ripple selectable>
                    <ListSubHeader caption='分类' />
                    <ListItem caption={'算法（123）'} />
                    <ListItem caption={'javascript（5）'} />
                </List>
            </aside>
        );
    }
}