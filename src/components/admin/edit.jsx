import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import cs from 'classnames';

import fetchData from '../../assets/js/fetch';
import { addTag, } from '../../actions/tag';
import { saveArticle, editArticle } from '../../actions/article';
import styles from '../../styles/site';

import {
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILURE,
} from '../../constants/articleType';

import {
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE
} from '../../constants/tagType';

let md = null;
class Edit extends Component {
    constructor(props) {
        super(props);

        let { title, content, } = props.article;
        this.state = {
            title,
            content,
            tagsSelected: props.tagsSelected,
            message: '',
            active: false,
        };
    }
    
    async componentDidMount() {
        // 初始化markdown编辑器
        md = new Editor();
        md.render();
    }

    componentWillReceiveProps(props) {
        let { article, tagsSelected, mode } = props;

        if (mode === 1 && article.title) {
            md.codemirror.setValue(article.content);
            this.setState({
                ...this.state,
                tagsSelected,
                title: article.title,
                content: article.content
            });
        }
    }

    render() {
        let { title, content, tagsSelected, message, active } = this.state;
        
        // // 添加标签后消息提示
        let classname = cs(styles.mask, {
            [styles.active]: this.props.active
        });

        let saveArticle = cs(styles.fullMask, {
            [styles.active]: this.props.fetching
        });

        return (
            <div>
                <Input label='标题' onChange={this.changeTitle} value={title} />
                <div style={{"position":"relative"}}>
                    <Autocomplete
                        direction='down'
                        allowCreate={true}
                        showSelectedWhenNotInSource={true}
                        label='添加标签'
                        source={this.props.tags}
                        onChange={this.editTag}
                        value={tagsSelected}
                    />
                    <div className={classname}>
                        <ProgressBar className={styles.wh} type='circular' mode='indeterminate' />
                    </div>
                </div>
                <div>
                    <textarea defaultValue={content}></textarea>
                </div>
                <Button label='保存' raised onClick={this.saveArticle} />
                <div className={saveArticle}><ProgressBar type='circular' mode='indeterminate' /></div>
                <Snackbar action='Dismiss' label={message} active={active} timeout={3000} onTimeout={this.SnackbarTimeout} />
            </div>
        );
    }

    editTag = async val => {
        // 判断标签是否为新增
        let tag = val[0];
        
        // 删除完所选标签
        if (tag === undefined) {
            this.setState({...this.state, tagsSelected: val});
            return;
        }

        // 添加已有标签
        // 回车tag为值，此处需要获取到键
        let tags = this.props.tags;
        let exist = false;
        let key = '';
        for (let prop in tags) {
            if (tag === prop || tag === tags[prop]) {
                exist = true;
                key = prop;
                break;
            }
        }
        if (exist) {
            val.splice(0, 1, key);
            this.setState({...this.state, tagsSelected: val});
            return;
        }

        // 新增标签
        try {
            let res = await this.props.addTag(tag);
            if (res.type === ADD_TAG_FAILURE) {
                throw new Error(res.message);
            }
            val.splice(0, 1, res.data.data._id);

            this.setState({...this.state, tagsSelected: val});
        } catch (err) {
            this.setState({...this.state, active: true, message: err.message});
        }
    };

    changeTitle = val => {
        this.setState({...this.state, title: val});
    }

    saveArticle = async () => {
        let title = this.state.title.trim();
        let content = md.codemirror.getValue().trim();
        let tags = this.state.tagsSelected;
        let message = '';

        if (title === '') {
            message = '标题不能为空';
        } else if (title.length < 5 || title.length > 20) {
            message = '标题太长或太短';
        } else if (content === '') {
            message = '文章内容不能为空';
        } 

        if (message) {
            this.setState({...this.state, active: true, message});
            return;
        }

        // 保存文章
        let active = false;
        let res = null;
        try {
            let params = {
                title, content, tags
            };
            if (this.props.mode === 0) {
                res = await this.props.saveArticle(params);
            } else {
                params.id = this.props.article._id;
                res = await this.props.editArticle(params);
            }

            if (res.type.includes('FAILURE')) {
                throw new Error(res.message);
            }

            if (res.type.includes('SUCCESS')) {
                active = true;
                message = res.data.msg;
                md.codemirror.setValue('');
                this.setState({
                    ...this.state,
                    title: '',
                    content: '',
                    tagsSelected: [],
                    active,
                    message
                });

                // TODO: 保存成功跳到文章列表页
                setTimeout(() => {
                    browserHistory.push('/admin/article');
                }, 1500);
            }
        } catch (err) {
            active = true;
            message = err.message;
            this.setState({...this.state, active, message});
        }
    }

    SnackbarTimeout = () => {
        this.setState({...this.state, active: false});
    }
}


const mapStateToProps = state => {
    let {articles, tags} = state;
    let pathname = state.routing.locationBeforeTransitions.pathname.split('\/');
    let type = pathname[3];

    let tagsList = {};

    tags.list.forEach(tag => {
        tagsList[tag._id] = tag.tag;
    });

    // 新增
    if (type === 'create') {
        return {
            article: {
                title: '',
                content: ''
            },
            tags: tagsList,
            fetching: articles.isFetching,
            active: tags.isFetching,
            tagsSelected: [],
            mode: 0,
        };
    }

    // 编辑
    let article = {
        title: '',
        content: ''
    };

    let list = articles.list;
    let tagsSelected = [];
    let id = pathname[4]
    if (list.length !== 0) {
        for (let i = 0; i < list.length; i++) {
            if (list[i]._id === id) {
                article.title = list[i].title;
                tagsSelected = list[i].tags;
                article.content = list[i].content;
                break;
            }
        }
    }

    article._id = id;

    return {
        article,
        tags: tagsList,
        fetching: articles.isFetching,
        active: tags.isFetching,
        tagsSelected,
        mode: 1,
    }
};

export default connect(mapStateToProps, { addTag, saveArticle, editArticle })(Edit);
