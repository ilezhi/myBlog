import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../styles/site';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';

import TagList from './common/taglist';

const { homewrap, articleList, bottomLine, tagbar, datetime, article } = styles;

export default class Home extends Component {
    static defaultProps = {
        tags: ['javascript', 'web'],
        createdAt: '2017-05-09 14:37:19',
        updatedAt: '2017-05-09 14:38:20'
    };
    
    render() {
        return (
            <div className={styles.homewrap}>
                <div className={articleList}>
                    {/*<span>博文列表</span>*/}
                    <div>
                        <Card>
                            <CardTitle title='Javascript 最佳实践' subtitle={this.renderTagsAndDate()} />
                            <CardText className={article}>{'今天我们来谈一谈javascript中常用的数组方法'}</CardText>
                            <CardActions>
                                <Button label='阅读更多'></Button>
                                <Link to='/article/edit/1' >编辑</Link>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                <TagList />
            </div>
        );
    }

    renderTagsAndDate = () => {
        let tags = this.props.tags.map((tag, i) => {
            return (
                <Chip key={i}><span>{tag}</span></Chip>
            )
        });
        return (
            <div className={tagbar}>
                <div className={bottomLine}>
                    <span>标签：</span>
                    {tags}
                </div>
                <div className={datetime}>
                    <p>created: <span>{this.props.createdAt}</span></p>
                    <p>updated: <span>{this.props.updatedAt}</span></p>
                </div>
            </div>
        );
    }
}