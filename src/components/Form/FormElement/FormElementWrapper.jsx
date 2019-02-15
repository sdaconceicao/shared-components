import React from "react";
import PropTypes from 'prop-types'

import Label from "../Label";

import './FormElementWrapper.scss';

export const FormElementWrapper = ({children, label, id, required}) => (
    <div className={'form-element'}>
        {label && <Label htmlFor={id} required={required}>{label}</Label>}
        {children}
    </div>
);

export default FormElementWrapper;

FormElementWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    id: PropTypes.string,
    required: PropTypes.bool
};

FormElementWrapper.defaultValues = {
    required: false
};