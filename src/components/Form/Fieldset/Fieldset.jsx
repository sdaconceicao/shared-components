import React from 'react';
import PropTypes from 'prop-types';

import './Fieldset.scss';

const Fieldset = ({children, className, legend, required}) => {
    return (
        <fieldset className={`fieldset ${className}`}>
            {legend && <legend className="fieldset__legend">{legend}{required && <span className="fieldset--required">*</span>}</legend>}
            {children}
        </fieldset>
    )
};

Fieldset.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    className: PropTypes.string,
    required: PropTypes.bool,
    legend: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

Fieldset.defaultValues = {
    className: '',
    required: false
};

export default Fieldset;

