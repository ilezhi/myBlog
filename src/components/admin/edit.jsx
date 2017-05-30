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
import { addTag } from '../../actions/tag';
import { saveArticle } from '../../actions/article';
import styles from '../../styles/site';

import {
    SAVE_ARTICLE_SUCCESS,
    SAVE_ARTICLE_FAILURE,
} from '../../constants/articleType';

import {
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE
} from '../../constants/tagType';

let source = ['javascrpt', 'web', '散文', '算法'];
let md = null;
class Edit extends Component {
    constructor(props) {
        super(props);
        let operation = props.location.pathname.substring(1).split('/')[1];

        this.state = {
            title: '',
            tags: [],
            content: '',
            active: false,
        }

        if (operation === 'edit') {
            let id = props.params.id;
            let article = props.articles[id];

            this.state.title = article.title;
            this.state.tags = article.tags;
            this.state.content = article.content;
        }
    }
    componentDidMount() {
        md = new Editor();
        md.render();
    }
    render() {
        let { title, content, tags, active } = this.state;
        // 添加标签后消息提示
        let { tagLoading, tagSource, saving, msg, msgType } = this.props;
        console.log('saving', saving);
        let classname = cs(styles.mask, {
            [styles.active]: tagLoading
        });

        let saveArticle = cs(styles.fullMask, {
            [styles.active]: saving
        });

        return (
            <div>
                <Input label='标题' value={title} onChange={this.changeTitle} />
                <div style={{"position":"relative"}}>
                    <Autocomplete
                        direction='down'
                        allowCreate={true}
                        selectedPosition='above'
                        label='添加标签'
                        source={tagSource}
                        onChange={this.changeTags}
                        value={tags}
                    />
                    <div className={classname}>
                        <ProgressBar className={styles.wh} type='circular' mode='indeterminate' />
                    </div>
                </div>
                <div>
                    <textarea value={content}></textarea>
                </div>
                <Button label='保存' raised onClick={this.saveArticle} />
                <div className={saveArticle}><ProgressBar type='circular' mode='indeterminate' /></div>
                <Snackbar
                    action='消息'
                    timeout={2000}
                    label={msg}
                    type={msgType}
                    active={active}
                    onTimeout={this.snackbarTimeout}
                />
            </div>
        );
    }
    changeTags = async tags => {
        console.log('change');
        var state = { ...this.state };
        // delete all tags
        if (tags.length === 0) {
            console.log('删除标签');
            state.tags = [];
            this.setState(state);
            return;
        }

        var tag = tags[0];

        // add existing tag
        if (this.props.tagSource.includes(tag)) {
            console.log('已存在标签');
            state.tags = tags;
            this.setState(state);
            return;
        }

        // add new tag
        let { addTag } = this.props;
        let res = await addTag(tag);

        state.active = true;
        // add tag successfully
        if (res.type === ADD_TAG_SUCCESS) {
            state.tags.push(tag);
            state.active = true;
        }

        this.setState(state);

    };

    // 标题修改
    changeTitle = title => {
        let state = { ...this.state };
        state.title = title;
        this.setState(state);
    }

    saveArticle = async () => {
        let title = this.state.title.trim();
        if (title === '') {
            alert('请填写标题');
            return;
        }

        let params = {
            title: this.state.title,
            content: md.codemirror.getValue(),
            tags: this.state.tags,
        };

        let operation = this.props.location.pathname.substring(1).split('/')[1];
        if (operation === 'edit') {
            params.id = props.params.id;
        }

        let res = await this.props.saveArticle(params);

        if (res.type === SAVE_ARTICLE_SUCCESS) {
            // 进入文章列表页
            console.log('save success', res);
            browserHistory.push('/admin/article');
            return;
        }

        // 保存失败
        this.setState({...this.state, active: true});
    }

    snackbarTimeout = () => {
        this.setState({
            ...this.state,
            active: false
        });
    }
}


const mapStateToProps = state => {
    let { articles, tags } = state;
    let tagSource = tags.tags.map(tag => {
        return tag.name;
    });

    let msg = '';
    let msgType = '';

    if (!tags.isFetching) {
      if (tags.error) {
        msg = '添加标签失败';
        msgType = 'warning';
      } else {
        msg = '添加标签成功';
        msgType = 'accept';
      }
    }

    if (!articles.isFetching && articles.error) {
      active = true;
      msg = '添加文章失败';
      msgType = 'warning';
    }

    console.log('article', articles);

    return {
        msg,
        msgType,
        tagSource,
        tagLoading: tags.isFetching || false,
        saving: articles.isFetching || false,
        articles: articles.list || []
    };
}

export default connect(mapStateToProps, { addTag, saveArticle })(Edit);
