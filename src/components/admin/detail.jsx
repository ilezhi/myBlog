import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleInfo from '../common/info.jsx';
import Article from '../common/article.jsx';

/**
 * 文章详情页
 * 
 */
class ArticleDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let article = null;
        let { list: articles, params: { id } } = this.props;
        try {
            for (let i = 0; i < articles.length; i++) {
                if (articles[i]._id === id) {
                    article = articles[i];
                    break;
                }
            }
        } catch (err) {
            console.log(err.message);
        }

        if (article === null) {
            return (
                <div><p>您要查找的文章不存在。</p></div>
            );
        }

        let { title, content, tags: tagsId, ...left } = article;
        let tagsList = this.props.tagsList;
        // 根据tags中的id在tagsList中找到名称
        let tags = [];
        if (tagsList.length > 0) {
            tags = tagsId.map(id => {
                for (let i = 0; i < tagsList.length; i++) {
                    if (tagsList[i]._id === id) {
                        return tagsList[i];
                    }
                }
            });
        }

        let data = { title, content, tags };

        return (
            <section id="article">
                <ArticleInfo {...left} />
                <Article {...data} />
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.articles,
        tagsList: state.tags.list
    };
};

export default connect(mapStateToProps)(ArticleDetail);