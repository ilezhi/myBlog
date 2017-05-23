import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import cs from 'classnames';

import fetchData from '../../assets/js/fetch';
import { addTag } from '../../actions/tag';
import styles from '../../styles/site';
import {
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE
} from '../../constants/tagType';

let source = ['javascrpt', 'web', '散文', '算法'];
let md = null;
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: ['web'],
            content: '',
            active: false,
        };
    }
    componentDidMount() {
        md = new Editor();
        md.render();
    }
    render() {
        let { title } = this.state;
        // 添加标签后消息提示
        let { msg, msgType, active, tagLoading, tagSource } = this.props;

        let classname = cs(styles.mask, {
            [styles.active]: tagLoading
        });


        return (
            <div>
                <Input label='标题' value={this.state.title} onChange={this.changeTitle} />
                <div style={{"position":"relative"}}>
                    <Autocomplete 
                        direction='down'
                        allowCreate={true}
                        selectedPosition='above'
                        label='添加标签'
                        source={tagSource}
                        onChange={this.changeTags}
                        value={this.state.tags}
                    />
                    <div className={classname}>
                        <ProgressBar className={styles.wh} type='circular' mode='indeterminate' />
                    </div>
                </div>
                <div>
                    <textarea></textarea>
                </div>
                <Button label='保存' raised onClick={this.saveArticle} />
                <Snackbar 
                    action='消息'
                    timeout={2000} 
                    label={msg} 
                    type={msgType} 
                    active={this.state.active}
                    onTimeout={this.snackbarTimeout}
                />
            </div>
        );
    }
    changeTags = async tags => {
        console.log(tags);
        var state = { ...this.state };

        // delete all tags
        if (tags.length === 0) {
            state.tags = [];
            this.setState(state);
            return;
        }

        var tag = tags[0];

        // add existing tag
        if (this.props.tagSource.includes(tag)) {
            state.tags = tags;
            this.setState(state);
            return;
        }

        // add new tag
        let { addTag } = this.props;
        let res = addTag(tag);
        if (!res) {
            // 使用缓存数据
            return;
        }

        res.then(res => {
            // 成功添加标签
            state.active = true;
            if (res.type === ADD_TAG_SUCCESS) {
                state.tags.push(tag);
            }
            this.setState(state);
        });
    };

    // 标题修改
    changeTitle = title => {
        var state = { ...this.state };
        state.title = title;
        this.setState(state);
    }

    saveArticle = () => {
        console.log(this.state.title);
    }

    snackbarTimeout = () => {
        this.setState({ 
            ...this.state,
            active: false
        })
    }
}

const mapStateToProps = state => {
    let { tags, isFetching, error } = state.tags;
    let tagSource = tags.map(tag => {
        return tag.name;
    });

    return {
        tagSource,
        tagLoading: isFetching,
        msgType: (!isFetching && error === '') ? 'accept' : 'warning',
        msg: !isFetching ? error === '' ? '添加标签成功' : error : '',
    };
}

export default connect(mapStateToProps, { addTag })(Edit);