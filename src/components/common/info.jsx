import React, { Component } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Tooltip from 'react-toolbox/lib/tooltip';

import styles from '../../styles/site';

const TooltipIcon = Tooltip(FontIcon);

const ArticleInfo = props => {
    return (
        <ul className={styles.info}>
            <li><TooltipIcon tooltip='发布' value='query_builder'/> {moment(props.create_at).fromNow()}</li>
            <li><TooltipIcon tooltip='更新' value='update'/> {moment(props.update_at).fromNow()}</li>
            {/*<li><TooltipIcon tooltip='评论' value='comment'/> {props.reply_count}</li>
            <li><TooltipIcon tooltip='浏览' value='visibility'/> {props.visit_count}</li>*/}
        </ul>
    )
};


export default ArticleInfo;
