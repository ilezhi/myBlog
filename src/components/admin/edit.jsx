import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import cs from 'classnames';

import fetchData from '../../assets/js/fetch';
import styles from '../../styles/site';

let source = ['javascrpt', 'web', '散文', '算法'];
let md = null;
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            source: ['javascrpt', 'web', '散文', '算法'],
            tags: ['web'],
            msg: '',
            msgType: '',
            active: false,
            loading: false
        };
    }
    componentDidMount() {
        md = new Editor();
        md.render();
    }
    render() {
        let { title } = this.state;
        let classname = cs(styles.mask, {
            [styles.active]: this.state.loading
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
                        source={this.state.source}
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
                    label={this.state.msg} 
                    type={this.state.msgType} 
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
        if (state.source.includes(tag)) {
            state.tags = tags;
        } else {
            // add new tag
            try {
                this.setState({
                    ...this.state,
                    loading: true
                });
                let res = await fetchData('POST', '/api/tag/create', { tag });
                this.setState({
                    ...this.state,
                    loading: false
                });
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                }

                let result = await res.json();
                let { code, msg } = result;
                state.msgType = code ? 'warning' : 'accept';
                state.msg = msg;
                state.active = true;
                state.source.push(tag);
                state.tags.push(tag);
            } catch (err) {
                state.msg = err.message;
                state.msgType = 'warning';
                state.active = true;
            }
        }

        this.setState(state);
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