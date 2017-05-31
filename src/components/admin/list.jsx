import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, IconButton } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import styles from '../../styles/site';
import { fetchArticles } from '../../actions/article';

console.log(styles);

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10
        };
    }

    componentDidMount() {
        
        let { list, fetchArticles } = this.props;
        if (!list || list.length === 0) {
            fetchArticles({
                page: 1,
                pageSize: 10
            });
        }
    }

    render() {
        let { list, page, pageSize, count } = this.props;


        return (
            <div>
                <div style={{padding: '10px'}}>
                    <Link to="/admin/article/create" icon="create" >
                        <FontIcon value="create" />
                    </Link>
                </div>
                <div>
                    {typeof list === 'undefined' ? (<div>暂时没有文章</div>) : this.renderArticles(list)}
                </div>
            </div>
        );
    }


    renderArticles(articles) {
        let articleItem = articles.map((article, i) => {
            let {id, title} = article;

            return (
                <ListItem className={styles.articleItem} key={i} caption={title} onClick={this.checkDetailOfArticle.bind(this, id)}
                    rightActions={[<Link key={i} to={`/admin/article/edit/${id}`} icon="edit"><FontIcon value="edit" /></Link>, <IconButton key={i} icon="delete" />]} />
            );
        });


        return (
            <List ripple selectable className={styles.articleWrap}>
                {articleItem}
            </List>
        );
    }

    checkDetailOfArticle(id) {
        console.log(id);
        // alert('查看文章详情');
        // browserHistory.push(`/admin/article/`);
    }
}

const mapStateToProps = state => {
    return { ...state.articles };
}

export default connect(mapStateToProps, { fetchArticles })(ArticleList);
