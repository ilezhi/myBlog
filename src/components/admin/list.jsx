import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

import styles from '../../styles/site';
import { fetchArticles, delArticleById } from '../../actions/article';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            active: false,
            title: ''
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
                <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    title="删除确认">
                    <p>确认删除文章《{this.state.title}》</p>
                </Dialog>
            </div>
        );
    }

    actions = [
        { label: '取消', onClick: this.closeDialog.bind(this)},
        { label: '确认', onClick: this.delArticle.bind(this)}
    ];


    renderArticles(articles) {
        let articleItem = articles.map((article, i) => {
            let {id, title} = article;

            return (
                <ListItem className={styles.articleItem} key={i} caption={title} onClick={this.checkDetailOfArticle.bind(this, id)}
                    rightActions={[<Link key={i} to={`/admin/article/edit/${id}`} icon="edit"><FontIcon value="edit" /></Link>, <IconButton onClick={this.openDialog.bind(this, id)} key={i} icon="delete" />]} />
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

    // 打开删除文章确认窗口
    openDialog(id) {
        let title = '';
        let { list: articles } = this.props;
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === id) {
                title = articles[i].title;
                break;
            }
        }
        
        this.setState({
            id,
            active: true,
            title
        });
    }

    // 删除文章
    delArticle() {
        let id = this.state.id;
        console.log(id);
        this.props.delArticleById(id);
        this.setState({
            ...this.state,
            active: false
        });
    }

    // 取消删除文章确认窗口
    closeDialog() {
        this.setState({
            active: false,
            title: '',
            id: ''
        });
    }
}

const mapStateToProps = state => {
    return { ...state.articles };
}

export default connect(mapStateToProps, { fetchArticles, delArticleById })(ArticleList);
