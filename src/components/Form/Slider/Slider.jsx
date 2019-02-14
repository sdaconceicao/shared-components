import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import RcSlider from 'rc-slider';

import Label from "../Label";
import {withForm} from "../FormContext";
import FormElement from "../FormElement";

import 'rc-slider/assets/index.css';
import './Slider.scss';

export class Slider extends FormElement {

    componentDidUpdate(prevProps){
        if(this.props.value !== prevProps.value){
            this.setState({value: this.props.value});
        }
    }

    onChange = (value) =>{
        const {onChange} = this.props;
        this.setState({value});
        onChange && onChange(value);
    };

    render (){
        const {id, label, required, className, disabled, minValue, maxValue, tabIndex} = this.props,
            {value} = this.state;
        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <RcSlider
                    id={id}
                    className={`${className}`}
                    disabled={disabled}
                    defaultValue={value}
                    value={value}
                    tabIndex={tabIndex}
                    min={minValue}
                    max={maxValue}
                    onChange={this.onChange}
                  />
            </Fragment>

        )
    }
}

Slider.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

Slider.defaultProps = {
    className: '',
    disabled: false,
    value: 50,
    minValue: 0,
    maxValue: 100
};

export default withForm(Slider);