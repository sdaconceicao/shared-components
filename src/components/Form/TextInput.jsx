import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {withForm} from './FormContext';
import Label from './Label';

/** Text Input component with optional label */
class TextInput extends Component {

    render(){
        const { id, name, type, tabIndex, autoCapitalize, className, placeholder, disabled,
                label, required,
                onBlur, onKeyDown, onChange, value} = this.props;

        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <input
                    name={name}
                    id={id}
                    type={type}
                    className={`form-control ${className}`}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value}
                    autoCapitalize={autoCapitalize}
                    onKeyDown={onKeyDown}
                    tabIndex={tabIndex}
                    onChange={(e)=>onChange({...e, value: e.target.value}, name)}
                    onBlur={onBlur}/>
            </Fragment>
        );
    }

};

TextInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    /** Type of input, text or password */
    type: PropTypes.string.isRequired,
    /** Controls whether first character input is automatically capitalized */
    autoCapitalize: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

TextInput.defaultProps = {
    tabIndex: 1,
    type: "text",
    placeholder: '',
    disabled: false,
    className: '',
    autoCapitalize: 'none',
    required: false
};

export default withForm(TextInput);
