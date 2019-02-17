import React from 'react';
import PropTypes from 'prop-types';

import * as image from './placeholder.png';

export const PlaceholderImage = ({className, alt}) => (
    <img className={`placeholder ${className}`} src={image} alt={alt}/>
);


PlaceholderImage.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string
};

PlaceholderImage.defaultProps = {
    className: ''
};

export default PlaceholderImage;