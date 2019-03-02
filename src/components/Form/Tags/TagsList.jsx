import React from 'react';
import PropTypes from 'prop-types';

import Tag from './Tag';
import {withTags} from "./TagContext";

export const TagsList = ({tags}) => (
    <div className='tags-list'>
        {tags && tags.map(tag=>{
            return <Tag key={tag}>{tag}</Tag>
        })}
    </div>
);

TagsList.propTypes = {
    tags: PropTypes.array
};

export default withTags(TagsList);