import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import FaSquare from 'react-icons/lib/fa/square';
import FaCheck from 'react-icons/lib/fa/check-square';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';

import './Checkbox.scss';

export class Checkbox extends FormElement{

    onChange = (e) =>{
        this.setState({checked: e.target.checked});
    };

    getValue(){
        return this.state.checked
            ? this.props.value
            : undefined;
    }

    render(){
        const {id, name, className, tabIndex, index, value, disabled, label, required,
            checkedIcon, uncheckedIcon} = this.props,
            {checked} = this.state;
        return (
            <div className={`checkbox ${className}`}>
                <input id={id}
                       name={name}
                       type="checkbox"
                       defaultChecked={checked}
                       disabled={disabled}
                       onChange={this.onChange}
                       value={value}
                       tabIndex={tabIndex}
                       index={index} />
                <Label htmlFor={id} required={required}>
                    <Fragment>
                    {checked && checkedIcon}
                    {!checked && uncheckedIcon}
                    {label}
                    </Fragment>
                </Label>
            </div>
        );
    }

}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    className: '',
    tabIndex: 1,
    disabled: false,
    value: false,
    checked: false,
    checkedIcon: <FaCheck/>,
    uncheckedIcon: <FaSquare/>
};

export default withForm(Checkbox);
