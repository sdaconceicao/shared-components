import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';

import './Input.scss';

/** Text Input component with optional label */
export class Input extends FormElement {

    render() {
        const {
            id, name, type, tabIndex, autoCapitalize, className, style, placeholder, disabled, index, maxLength,
            onBlur, onKeyDown
        } = this.props,
        {ref, value, errors} = this.state;
        return (
            <input
                name={name}
                id={id}
                ref={ref}
                className={`form-control ${className} ${errors ? 'error' : ''}`}
                style={style}
                index={index}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                onKeyDown={onKeyDown}
                tabIndex={tabIndex}
                onChange={(e) => this.onChange({...e, value: e.target.value}, name, index)}
                onBlur={onBlur}/>
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
    required: PropTypes.bool,
    /** Type of input, text or password */
    type: PropTypes.string.isRequired,
    /** Controls whether first character input is automatically capitalized */
    autoCapitalize: PropTypes.string,
    maxLength: PropTypes.number,
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
