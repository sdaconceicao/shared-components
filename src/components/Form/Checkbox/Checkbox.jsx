import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import Label from '../Label';

import './Checkbox.scss';

const Checkbox = (props) => {
    const {id, name, className, tabIndex, value, checked, disabled, label, required} = props;

    function onChangeWrapper(e){
        props.onChange({...e, value: e.target.value, checked: e.target.checked}, props.name);
    }

    return (
        <div className={className}>
            <input id={id}
                   name={name}
                   type="checkbox"
                   defaultChecked={checked}
                   disabled={disabled}
                   onChange={onChangeWrapper}
                   value={value}
                   tabIndex={tabIndex}/>
            {label && <Label htmlFor={id} required={required}>{label}</Label>}
        </div>
    );
};

Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    tabIndex: 1,
    disabled: false,
    value: false,
    checked: false
};

export default withForm(Checkbox);
