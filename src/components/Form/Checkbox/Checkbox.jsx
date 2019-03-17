import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import FaSquare from 'react-icons/lib/fa/square';
import FaCheck from 'react-icons/lib/fa/check-square';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';

import './Checkbox.scss';

export class Checkbox extends FormElement{

    state={
        checked: this.props.checked
    };

    shouldComponentUpdate(nextProps, nextState){
        const shouldUpdate = super.shouldComponentUpdate(nextProps, nextState);
        if (!shouldUpdate){
            if(this.props.checked !== nextProps.checked
            || this.state.checked !== nextState.checked){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    onChange = (e) =>{
        this.setState({checked: e.target.checked});
        this.props.onChange && this.props.onChange({
            value: this.props.value,
            checked: e.target.checked,
            name: this.props.name
        });
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
            <Label htmlFor={id} required={required} className={`checkbox ${className}`}>
                <Fragment>
                    {checked && checkedIcon}
                    {!checked && uncheckedIcon}
                    {label}
                    <input id={id}
                           name={name}
                           className="d-none"
                           type="checkbox"
                           defaultChecked={checked}
                           disabled={disabled}
                           onChange={this.onChange}
                           value={value}
                           tabIndex={tabIndex}
                           index={index} />
                </Fragment>
            </Label>
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
    checkedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
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
