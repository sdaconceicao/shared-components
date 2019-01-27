import React from 'react';
import PropTypes from 'prop-types';

/** Label component */
const Label = ({htmlFor, className, required, children}) => {
    return (
        <label htmlFor={htmlFor} className={`${className} form-label`}>
            {children}
            {required && <span className="label-required">*</span>}
        </label>
    )
};

Label.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    /** HTML element id that a label correlates to */
    htmlFor: PropTypes.string,
    /** Flag for controlling whether an element is required, to display a required asterick */
    required: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Label.defaultProps = {
    required: false,
    className: ''
};

export default Label;

