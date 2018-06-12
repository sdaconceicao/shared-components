import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StyledSelect from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';

import {withForm} from './FormContext';
import Label from './Label';

/** Select component with optional autocomplete and label */
class Select extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.onChangeWrapper = this.onChangeWrapper.bind(this);
    }


    onChangeWrapper(value){
        const {onChange} = this.props;
        onChange && onChange({value}, this.props.name);
    }

    onInputChange(value){
        const {onKeyDown} = this.props;
        onKeyDown && onKeyDown({value}, this.props.name);
    }

    render(){
        const { id, name,  tabIndex, className, placeholder, add, autocomplete, options, disabled,
                label, required, value,
                onBlur} = this.props;

        return (
            <div className={className}>
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
                        onChange={value => this.onChangeWrapper(value)}
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
                        onChange={value => this.onChangeWrapper(value)}
                        onInputChange={inputValue => this.onInputChange(inputValue)}
                        onBlur={onBlur}
                    />
                }
            </div>
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
    label: PropTypes.string,
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
