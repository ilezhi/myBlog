import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from '../styles/site';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';

import TagList from './common/taglist';
import Info from './common/info';
import TagChip from './common/tagchip';

// const { homewrap, articleList, bottomLine, tagbar, datetime, article } = styles;
class Home extends Component {
    // static defaultProps = {
    //     tags: ['javascript', 'web'],
    //     createdAt: '2017-05-09 14:37:19',
    //     updatedAt: '2017-05-09 14:38:20'
    // };
    
    render() {
        let { articles, tags } = this.props;
        return (
            <div className={styles.homewrap}>
                <div className={styles.articleList}>
                    {/*<span>博文列表</span>*/}
                    {this.renderArticleList(articles.list, tags.list)}
                </div>
            </div>
        );
    }

    /**
     * 显示文章列表
     * @param {[]} articles 
     * @param {[]} tags
     * @returns {[component]} 
     */
    renderArticleList(articles, tags) {
        if (articles.length === 0) {
            return (<p>没有文章</p>);
        }

        return articles.map((article, i) => {
            let { title, content, tags: tagsId, _id, ...left} = article;
            let html = content.length > 200 ? marked(content.substr(0, 100) + '...') : marked(content);
            return (
                <Card key={i}>
                    <CardTitle className='c-t' title={title} children={[<Info key={i + 'info'} {...left} />, <TagChip key={i + 'tag'} tagsId={tagsId} tags={tags} />]} />
                    <CardText className={styles.article} dangerouslySetInnerHTML={{__html: html}} />
                    <CardActions>
                        <Link to={`/article/${_id}`}>阅读更多 &raquo;</Link>
                    </CardActions>
                </Card>
            );
        });
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        tags: state.tags
    };
};

export default connect(mapStateToProps)(Home);