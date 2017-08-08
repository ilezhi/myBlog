import React, { Component } from 'react';
import Chip from 'react-toolbox/lib/chip';
import styles from '../../styles/site';

const Article = props => {
    marked.setOptions({
        highlight: code => hljs.highlightAuto(code).value
    });
    return (
        props.tags === null 
        ? <p>bla</p>
        : <article className={styles.articleDetail}>
            <h1>{props.title}</h1>
            <aside className='tags'>
                {props.tags ? props.tags.map(tag => <Chip key={tag._id}><span>{tag.tag}</span></Chip>) : false}
            </aside>
            <div className={styles.article} dangerouslySetInnerHTML={{__html: marked(props.content)}} />
        </article>
    )
};

export default Article;