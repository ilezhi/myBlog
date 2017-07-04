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
import { addTag, fetchTags } from '../../actions/tag';
import { saveArticle } from '../../actions/article';
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
        // let operation = props.location.pathname.substring(1).split('/')[1];

        this.state = {
            title: props.title,
            tags: props.tags,
            content: props.content,
            active: props.active,
            tagsSelected: props.tagsSelected,
        };


        // if (operation === 'edit') {
        //     let id = props.params.id;
        //     let article = props.articles[id];

        //     this.state.title = article.title;
        //     this.state.tags = article.tags;
        //     this.state.content = article.content;
        // }
    }
    // static defaultProps = {

    // }
    async componentDidMount() {
        // 获取标签列表
        if (this.props.mode === 0 && !('_id' in this.state.tags)) {
            await this.props.fetchTags();
            this.setState({...this.state, tags: this.props.tags});
        }

        // 初始化markdown编辑器
        md = new Editor();
        md.render();
    }
    render() {
        let { title, content, tags, active, tagsSelected } = this.state;
        // // 添加标签后消息提示
        // let { tagLoading, tagSource, saving, msg, msgType } = this.props;
        // console.log('saving', saving);
        let classname = cs(styles.mask, {
            [styles.active]: this.props.active
        });

        // let saveArticle = cs(styles.fullMask, {
        //     [styles.active]: saving
        // });
        return (
            <div>
                <Input label='标题' />
                <div style={{"position":"relative"}}>
                    <Autocomplete
                        direction='down'
                        allowCreate={true}
                        selectedPosition='above'
                        label='添加标签'
                        showSelectedWhenNotInSource={true}
                        source={this.props.tags}
                        onChange={this.editTag}
                        value={tagsSelected}
                    />
                    <div className={classname}>
                        <ProgressBar className={styles.wh} type='circular' mode='indeterminate' />
                    </div>
                </div>
                <div>
                    <textarea value={content}></textarea>
                </div>
                <Button label='保存' raised />
                <div><ProgressBar type='circular' mode='indeterminate' /></div>
            </div>
        );
    }

    editTag = async val => {
        // 判断标签是否为新增
        let tag = val[0];
        
        // 删除完所选标签
        if (tag === undefined) {
            this.setState({...this.state, tagsSelected: []});
            return;
        }

        // 判断是已有标签，还是新增标签
        // 新增标签
        if (!(tag in this.props.tags)) {
            let res = await this.props.addTag(tag);
            val.splice(0, 1, res.data.data._id);
        }

        this.setState({...this.state, tagsSelected: val});
    }
}


const mapStateToProps = state => {
    let pathname = state.routing.locationBeforeTransitions.pathname;
    let mode = pathname.substring(1).split('\/')[2];

    let tags = {};

    if (state.tags.list.length > 0) {
        // 将tag提取称字符串数组
        state.tags.list.forEach(item => {
            tags[item._id] = item.tag
        });
    }

    if (mode === 'edit') {
        return {
            title: '',
            tags: tags,
            content: '',
            active: state.tags.isFetching,
            tagsSelected: [],
            mode: 1,
        };
    } else {
        return {
            title: '',
            tags: tags,
            content: '',
            active: state.tags.isFetching,
            tagsSelected: [],
            mode: 0,
        };
    }
};

export default connect(mapStateToProps, { addTag, saveArticle, fetchTags })(Edit);
