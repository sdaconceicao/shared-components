import React from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';
import FaClose from 'react-icons/lib/fa/close';
import Button from '../Button';

import {withTags} from "./TagContext";

import './Tag.scss';

export const Tag = ({children, editable, onRemove}) => (
    <Badge className={'tag'}>
        <span className="tag__content">{children}</span>
        {editable && <Button onClick={() => onRemove(children)}><FaClose/></Button>}
    </Badge>
);

Tag.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    editable: PropTypes.bool,
    onRemove: PropTypes.func
};

export default withTags(Tag);