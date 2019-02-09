import React from 'react'
import PropTypes from 'prop-types';
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";

import {withForm} from '../FormContext';
import FormElement from "../FormElement";
import Label from '../Label';
import {ColorPickerDialog} from './ColorPickerDialog';

import './ColorPicker.scss';

export class ColorPicker extends FormElement {
    state = {
        open: false,
        value: this.props.value
    };

    onToggle = () =>{
        this.setState({open: !this.state.open});
    };

    onChange = (value) => {
        const {onChange} = this.props;
        this.setState({value});
        onChange && onChange('color', value);
    };

    render() {
        const {value, open} = this.state,
            {id, className, initialColor, disabled, direction, label, required} = this.props;
        return (
            <span className={`form-element ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Dropdown toggle={this.onToggle} isOpen={open} id={id} className={`color-dropdown ${direction}`} direction={direction}>
                    <DropdownToggle tag="button" onClick={(e)=>e.preventDefault()} className="btn color-dropdown__button" disabled={disabled}>
                        { initialColor === 'mixed' &&
                        <span className="color-dropdown__indicator"> ? </span>
                        }
                        { initialColor !== 'mixed' &&
                        <span className="color-dropdown__indicator" style={{backgroundColor: value}}></span>
                        }
                    </DropdownToggle>
                    <DropdownMenu>
                        <ColorPickerDialog onClose={this.onToggle} onChange={this.onChange} value={value}/>
                    </DropdownMenu>
                </Dropdown>
            </span>
        )
    }
}

ColorPicker.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    direction: PropTypes.string,
    disabled: PropTypes.bool
};

ColorPicker.defaultProps = {
    value: '#ffffff',
    direction: 'down',
    disabled: false,
    className: ''
};

export default withForm(ColorPicker);