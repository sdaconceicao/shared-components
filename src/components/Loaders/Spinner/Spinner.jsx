import React from 'react';
import PropTypes from 'prop-types';
import {FaRefresh} from 'react-icons/lib/fa';

import './Spinner.scss';

export const Spinner = ({size, className}) => (
        <FaRefresh className={`spinner spinner--${size} ${className}`} />
);

Spinner.props = {
    size: PropTypes.oneOf(['xs','sm','md','lg','xl']),
    className: PropTypes.string
};

Spinner.defaultProps = {
    size: 'md',
    className: ''
};

export default Spinner;