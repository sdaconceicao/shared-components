import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label/Label';

/** Text Input component with optional label */
export class Input extends FormElement {

    render() {
        const {
            id, name, type, tabIndex, autoCapitalize, className, placeholder, disabled,
            label, required, index,
            onBlur, onKeyDown
        } = this.props,
        {value} = this.state;
        return (
            <span className={`form-element ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <input
                    name={name}
                    id={id}
                    className="form-control"
                    index={index}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value}
                    autoCapitalize={autoCapitalize}
                    onKeyDown={onKeyDown}
                    tabIndex={tabIndex}
                    onChange={(e) => this.onChange({...e, value: e.target.value}, name, index)}
                    onBlur={onBlur}/>
            </span>
        );
    }

};

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    /** Type of input, text or password */
    type: PropTypes.string.isRequired,
    /** Controls whether first character input is automatically capitalized */
    autoCapitalize: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

Input.defaultProps = {
    tabIndex: 1,
    type: "text",
    placeholder: '',
    disabled: false,
    className: '',
    autoCapitalize: 'none',
    required: false
};

export default withForm(Input);
