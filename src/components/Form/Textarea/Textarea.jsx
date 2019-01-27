import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TextAreaAutosize from 'react-textarea-autosize';

import {withForm} from '../FormContext';
import Label from '../Label';
import FormElement from "../FormElement";

/** Textarea component with label */
export class Textarea extends FormElement{

    render() {
        const {id, name, type, tabIndex, minRows, maxLength, placeholder, className, disabled,
            label, required,
            onBlur} = this.props,
            {value} = this.state;

        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <TextAreaAutosize
                    id={id}
                    type={type}
                    name={name}
                    minRows={minRows}
                    className={`form-control ${className}`}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    tabIndex={tabIndex}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    onChange={(e) => this.onChange({...e, value: e.target.value}, name)}
                />
            </Fragment>
        )
    }

}

Textarea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    /** Max number of characters allowed in field */
    maxLength: PropTypes.number,
    /** Default number of rows to display for an empty textara */
    minRows: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

Textarea.defaultProps = {
    tabIndex: 1,
    minRows: 3,
    className: '',
    placeholder: ''
};

export default withForm(Textarea);
