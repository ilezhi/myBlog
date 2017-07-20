import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Tooltip from 'react-toolbox/lib/tooltip';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import Input from 'react-toolbox/lib/input';

import styles from '../../styles/site';
import { fetchArticles, delArticleById } from '../../actions/article';
import { resetPasswd } from '../../actions/user';


const TooltipButton = Tooltip(IconButton);

class ArticleList extends Component {
    /**
     * 组件初始化时，判断文章数据是从props中来，还是需要请求数据
     * 1 如果list.length === 0, 则请求文章数据
     * 2 list.length !== 0   
     */
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 20,
            fetched: false,
            showDialog: false,
            title: '',
            id: '',
            active: false,
            showPass: false,
            passwd: '',
            cPasswd: ''
        };
    }

    async componentDidMount() {
        
    }

    render() {

        return (
            <div>
                <aside className={styles.createArticle}>
                    <Link to='/admin/article/create'><Button raised><FontIcon value="edit" /> 新增</Button></Link>
                    <div className='pull-right'><Button onClick={this.openPassDialog}>修改密码</Button></div>
                </aside>
                <div>
                    {this.renderArticles(this.props.list)}
                    {!this.props.isFetching && this.props.list.length === 0 ? <p>还没写过文章</p> : false}
                    {this.props.isFetching ? <ProgressBar type='circular' mode='indeterminate' /> : false}
                </div>
                <Dialog
                    actions={this.actions}
                    active={this.state.showDialog}
                    onOverlayClick={this.cancelDialog}
                    title='确认删除文章'>
                    <p>{this.state.title}</p>
                </Dialog>
                <Snackbar action='Dismiss' label={this.props.message.text} active={this.state.active} timeout={3000} onTimeout={this.SnackbarTimeout} />
                <Dialog
                    active={this.state.showPass}
                    actions={this.passActions}
                    onOverlayClick={this.cancelPassDialog}
                    title='修改密码'>
                    <div><Input type='password' label='passwd' value={this.state.passwd} onChange={this.changePasswd} /></div>
                    <div><Input type='password' label='confirm passwd' value={this.state.cPasswd} onChange={this.changeCPasswd} /></div>
                </Dialog>
            </div>
        );
    }

    actions = [
        { label: '取消', onClick: this.cancelDialog.bind(this) },
        { label: '删除', onClick: this.ensureDelArticle.bind(this) }
    ];

    passActions = [
        { label: '取消', onClick: this.cancelPassDialog.bind(this) },
        { label: '确定', onClick: this.resetPasswd.bind(this) }
    ];

    
    /**
     * 显示文章列表
     */
    renderArticles(articles) {
        let len = articles.length;
        if (len === 0) {
            return false;
        }

        let nodes = articles.map((article, i) => {
            let id = article._id;
            return (
                <ListItem
                    key={i}
                    className={styles.bb}
                    onClick={this.checkArticle.bind(this, id)} 
                    caption={article.title} 
                    rightActions={[
                        <TooltipButton tooltip='编辑' key={i} onClick={this.editArticle.bind(this, id)} icon='edit' />,
                        <TooltipButton tooltip='删除' key={i} onClick={this.delArticle.bind(this, id, article.title)} icon='delete' />
                ]} />
            )
        });

        return (
            <List>{nodes}</List>
        );
    }

    // 查看文章详情
    checkArticle(id) {
        browserHistory.push(`/admin/article/${id}`);
    }

    // 编辑文章
    editArticle(id) {
        event.stopPropagation();
        browserHistory.push(`/admin/article/edit/${id}`);
    }

    // 删除文章
    delArticle(id, title) {
        event.stopPropagation();
        this.setState({
            ...this.state,
            showDialog: true,
            id,
            title,
        })
    }

    async ensureDelArticle() {
        let res = await this.props.delArticleById(this.state.id);
        this.setState({
            ...this.state,
            active: true
        });
        this.cancelDialog();
    }

    /**
     * 关闭对话框
     */
    cancelDialog() {
        this.setState({
            ...this.state,
            showDialog: false,
        });
    }

    SnackbarTimeout = () => {
        this.setState({
            ...this.state,
            active: false,
        });
    }

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
    }

    /**
     * 打开修改密码框
     */
     openPassDialog = () => {
         this.setState({
             ...this.state,
             showPass: true
         });
     }

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

        this.cancelPassDialog();
     }

     changePasswd = passwd => {
        this.setState({
            ...this.state,
            passwd
        });
     }

     changeCPasswd = cPasswd => {
        this.setState({
            ...this.state,
            cPasswd
        });
     }
}

/**
 * isFetching, message, pagination, list
 */
const mapStateToProps = state => {
    return {
        ...state.articles
     };
}

export default connect(mapStateToProps, { fetchArticles, delArticleById, resetPasswd })(ArticleList);
