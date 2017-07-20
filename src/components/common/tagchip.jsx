import React, { Component } from 'react';
import Chip from 'react-toolbox/lib/chip';

const TagChip = props => {
    let { tagsId, tags } = props;
    if (tagsId.length === 0 || tags.length === 0) {
        return false;
    }

    let list = tagsId.map(id => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i]._id === id) {
                return tags[i];
            }
        }
    });

    return (
        <aside className='tags'>
                {list.map(tag => <Chip key={tag._id}><span>{tag.tag}</span></Chip>)}
        </aside>
    );
};


export default TagChip;
