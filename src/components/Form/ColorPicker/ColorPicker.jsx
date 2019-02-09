import React from 'react'
import PropTypes from 'prop-types';
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";

import {withForm} from '../FormContext';
import FormElement from "../FormElement";
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
            {id, className, initialColor, disabled, direction} = this.props;
        return (
            <Dropdown toggle={this.onToggle} isOpen={open} id={id} className={`color-dropdown ${className} ${direction}`} direction={direction}>
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
        )
    }
}

ColorPicker.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    direction: PropTypes.string,
    disabled: PropTypes.bool
};

ColorPicker.defaultProps = {
    value: '#ffffff',
    direction: 'down',
    disabled: false
};

export default withForm(ColorPicker);