import React from 'react';
import PropTypes from 'prop-types';

const Fieldset = ({children, legend, required}) => {
    return (
        <fieldset>
            {legend && <legend>{legend}{required && <span>*</span>}</legend>}
            {children}
        </fieldset>
    )
};

Fieldset.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default Fieldset;

