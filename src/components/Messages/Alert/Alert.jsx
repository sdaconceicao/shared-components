import React from 'react';
import PropTypes from 'prop-types';

import './Alert.scss';

export const Alert = ({type, className, children}) => (
    <div className={`alert alert--${type} ${className}`}>
        {children}
    </div>
);

Alert.props = {
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Alert.defaultProps = {
    className: ''
};

export default Alert;