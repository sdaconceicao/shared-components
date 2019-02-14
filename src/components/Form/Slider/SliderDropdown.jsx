import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import Label from "../Label";
import {Slider} from './Slider';
import {Input} from '../Input';
import {withForm} from "../FormContext";
import FormElement from '../FormElement'

import './SliderDropdown.scss';

export class SliderDropdown extends FormElement {

    state = {
        isOpen: false,
        value: this.props.value,
        inputValue: this.props.value,
        inputRef: React.createRef()
    };

    componentDidMount(){
        this.props.addFormElement && this.props.addFormElement(this);
        if (this.state.inputRef && this.state.inputRef.current){
            this.setState({width: `${(this.props.maxValue.toString().length - .5) * parseInt(window.getComputedStyle(this.state.inputRef.current.state.ref.current).fontSize, 10)}px` })
        }
    }

    onToggle = () =>{
        this.setState({isOpen: !this.state.isOpen});
    };

    onChangeWrapper = (value) =>{
        const {onChange} = this.props;
        this.setState({value, inputValue: value});
        onChange && onChange(value);
    };

    onChangeInput = (e) =>{
        const {onChange, minValue, maxValue} = this.props,
            numberValue = e.value === ''
                ? minValue
                : parseInt(e.value, 10);

        if (isNaN(numberValue)) return;
        this.setState({inputValue: numberValue});
        if(numberValue >= minValue && numberValue <= maxValue){
            this.setState({value: numberValue});
            onChange && onChange({value: numberValue}, this.props.id);
        }
    };

    render (){
        const {id, name, label, required, className, disabled, minValue, maxValue, tabIndex} = this.props,
            {isOpen, value, inputValue, width} = this.state;
        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Dropdown toggle={this.onToggle} isOpen={isOpen} className={`slider-dropdown ${className}`}>
                    <DropdownToggle id={id}  caret tag="button" className={'btn'} onClick={(e)=>e.preventDefault()}>
                    <Input id={`slider-${id}`}
                                    name={`slider-${name}`}
                                    ref={this.state.inputRef}
                                    value={inputValue}
                                    className="slider-dropdown__input"
                                    style={{width: width}}
                                    onChange={this.onChangeInput}/>

                    </DropdownToggle>
                    <DropdownMenu>
                    <Slider
                        id={`slider-${id}`}
                        name={name}
                        className="slider-dropdown__slider"
                        disabled={disabled}
                        value={value}
                        tabIndex={tabIndex}
                        minValue={minValue}
                        maxValue={maxValue}
                        onChange={this.onChangeWrapper} />
                    </DropdownMenu>
                </Dropdown>
            </Fragment>
        )
    }
}

SliderDropdown.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onChange: PropTypes.func
};

SliderDropdown.defaultProps = {
    className: '',
    disabled: false,
    minValue: 0,
    maxValue: 100
};

export default withForm(SliderDropdown);