import React, { Component } from 'react';
import Chip from 'react-toolbox/lib/chip';

const Article = props => {
    return (
        props.tags === null 
        ? <p>bla</p>
        : <article>
            <h1>{props.title}</h1>
            <aside className='tags'>
                {props.tags ? props.tags.map(tag => <Chip key={tag._id}><span>{tag.tag}</span></Chip>) : false}
            </aside>
            <div dangerouslySetInnerHTML={{__html: marked(props.content)}} />
        </article>
    )
};

export default Article;