import React from 'react';
import PropTypes from 'prop-types';
import StyledSelect from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label/Label';

/** Select component with optional autocomplete and label */
class Select extends FormElement {

    onInputChange = (e) =>{
        const {onKeyDown} = this.props;
        onKeyDown && onKeyDown({value: e.value}, this.props.name);
    };

    render(){
        const { id, name,  tabIndex, className, placeholder, add, autocomplete, options, disabled,
                label, required, value,
                onBlur} = this.props;

        return (
            <span className={`form-element select ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                {add &&
                    <CreatableSelect
                        id={id}
                        name={name}
                        tabIndex={tabIndex}
                        disabled={disabled}
                        isClearable
                        isSearchable={autocomplete}
                        options={options}
                        value={value}
                        placeholder={placeholder}
                        onChange={value => this.onChange(value)}
                        onInputChange={inputValue => this.onInputChange(inputValue)}
                        onBlur={onBlur}
                    />
                }
                {!add &&
                    <StyledSelect
                        id={id}
                        name={name}
                        tabIndex={tabIndex}
                        disabled={disabled}
                        isSearchable={autocomplete}
                        options={options}
                        value={value}
                        placeholder={placeholder}
                        onChange={value => this.onChange(value)}
                        onInputChange={inputValue => this.onInputChange(inputValue)}
                        onBlur={onBlur}
                    />
                }
            </span>
        );
    }

};

Select.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    options: PropTypes.array,
    /** Flag to control whether user can input options via textfield */
    add: PropTypes.bool,
    /** Flag to control whether textfield autocompletes */
    autocomplete: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

Select.defaultProps = {
    tabIndex: 1,
    className: '',
    required: false,
    disabled: false,
    add: false,
    autocomplete: true
};

export default withForm(Select);
